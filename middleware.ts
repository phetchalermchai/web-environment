import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // กรองไฟล์ Static เช่น .css, .js, .png, .jpg
  const isStaticFile = pathname.startsWith("/_next/") || pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|woff|woff2|ttf|otf|eot|map)$/);

  // หากเป็น Static File ให้ส่งต่อโดยไม่แก้ไข Header
  if (isStaticFile) {
    return NextResponse.next();
  }

  console.log("Middleware triggered on path:", pathname);

  // สำหรับ Dynamic Route เพิ่ม Header x-invoke-pathname
  const response = NextResponse.next();
  response.headers.set("x-invoke-pathname", pathname);


  return response;
}
