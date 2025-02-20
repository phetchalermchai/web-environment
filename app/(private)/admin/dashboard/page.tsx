import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // ไม่แสดง Navbar ถ้าไม่มี Session
  }

  // ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ session.user.id
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { firstname: true, lastname: true, email: true, role: true, avatar: true },
  });

  if (!session) {
    return (
      <div>
        <h1>คุณไม่มีสิทธิ์เข้าถึงหน้านี้</h1>
        <a href="/login">เข้าสู่ระบบ</a>
      </div>
    );
  }
  return (
    <div>
      <h1>สวัสดี {session.user?.email}</h1>
      <h1>สวัสดี {session.user?.firstname}</h1>
      <h1>สวัสดี {session.user?.lastname}</h1>
      <h1>สวัสดี {session.user?.id}</h1>
      <h1>สวัสดี {session.user?.avatar}</h1>
    </div>
  )
}

export default page