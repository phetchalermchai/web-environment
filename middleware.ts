import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ดึง Token ด้วย getToken
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // ตรวจสอบเส้นทาง `/admin`
  if (pathname.startsWith("/admin/dashboard")) {
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

  if (pathname.startsWith("/admin/banner")) {
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

  if (pathname.startsWith("/admin/e-service")) {
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

  if (pathname.startsWith("/admin/news/news-update")) {
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

  if (pathname.startsWith("/admin/news/activities")) {
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

  if (pathname.startsWith("/admin/agency/personnel")) {
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

  if (pathname.startsWith("/admin/users")) {
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

  if (pathname.startsWith("/admin/setting")) {
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

  return response;
}

// Matcher เพื่อระบุว่า Middleware นี้ทำงานกับเส้นทางใด
export const config = {
  matcher: ["/api/:path*", "/admin/:path*" , "/auth/secure/gateway/login"],
};
