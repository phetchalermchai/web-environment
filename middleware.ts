// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // สร้าง Response พร้อมแนบ Header x-invoke-pathname
  const response = NextResponse.next();
  response.headers.set("x-invoke-pathname", pathname);

  return response;
}
