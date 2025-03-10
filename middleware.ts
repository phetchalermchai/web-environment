import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ดึง Token ด้วย getToken
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // 🔹 อนุญาตให้เข้าถึง API `/api/activities` โดยไม่ต้องล็อกอิน
  if (pathname.startsWith("/api/activities")) {
    return NextResponse.next();
  }

  // ตรวจสอบเส้นทางที่ต้องการให้ล็อกอินก่อนใช้งาน
  const protectedRoutes = [
    "/admin/dashboard",
    "/admin/banner",
    "/admin/e-service",
    "/admin/news/news-update",
    "/admin/news/activities",
    "/admin/agency/personnel",
    "/admin/users",
    "/admin/setting"
  ];

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
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

  // 🔹 ตรวจสอบ API อื่นๆ (ยกเว้น `/api/auth/*` และ `/api/activities`)
  if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth") && !pathname.startsWith("/api/activities") && !pathname.startsWith("/api/news")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// Matcher เพื่อระบุว่า Middleware นี้ทำงานกับเส้นทางใด
export const config = {
  matcher: ["/admin/:path*", "/auth/secure/gateway/login", "/api/:path*"],
};
