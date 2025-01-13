import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // กรองไฟล์ Static เช่น .css, .js, .png, .jpg
  const isStaticFile = pathname.startsWith("/_next/") || pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|woff|woff2|ttf|otf|eot|map)$/);

  // หากเป็น Static File ให้ส่งต่อโดยไม่แก้ไข Header
  if (isStaticFile) {
    return NextResponse.next();
  }

  console.log("Middleware triggered on path:", pathname);

  // ดึง Token ด้วย getToken
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  // ตรวจสอบเส้นทาง `/admin`
  if (pathname.startsWith("/admin")) {
    // ถ้าไม่มี Token ให้ส่งไปหน้า Login
    if (!token) {
      return NextResponse.redirect(new URL("/auth/secure/gateway/login", request.url));
    }

    // ตรวจสอบ Role: อนุญาตเฉพาะ SUPERUSER และ USER
    const allowedRoles = ["SUPERUSER", "USER"];

    if (token && typeof token.role === "string" && !allowedRoles.includes(token.role)) {
      return NextResponse.redirect(new URL("/auth/secure/gateway/login", request.url));
    }
  }

  // ตรวจสอบเส้นทาง `/api/*` และยกเว้น `/api/auth/*`
  if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth")) {
    // ถ้าไม่มี Token ให้ส่ง HTTP 401 Unauthorized
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  // สำหรับ Dynamic Route เพิ่ม Header x-invoke-pathname
  const response = NextResponse.next();
  response.headers.set("x-invoke-pathname", pathname);


  return response;
}

// Matcher เพื่อระบุว่า Middleware นี้ทำงานกับเส้นทางใด
export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
