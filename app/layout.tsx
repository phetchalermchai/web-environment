import { cookies } from "next/headers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "หน้าแรก | เว็บไซต์ของฉัน",
  description: "ยินดีต้อนรับเข้าสู่เว็บไซต์ของหน่วยงาน",
  keywords: ["เว็บไซต์ราชการ", "ข้อมูลข่าวสาร", "บริการประชาชน"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get("theme")?.value || "light";
  return (
    <html lang="en" data-theme={theme}>
      <body className={`antialiased bg-base-300/30`}>
        {children}
      </body>
    </html>
  );
}
