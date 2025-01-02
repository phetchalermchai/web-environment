"use client"

export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          {children} {/* ไม่มี Header หรือ Navbar */}
        </body>
      </html>
    );
  }
  