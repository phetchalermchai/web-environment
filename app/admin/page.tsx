import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcrypt";

const page = async () => {
  const session = await getServerSession(authOptions);

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
      <h1>สวัสดี {session.user?.firstName}</h1>
    </div>
  )
}

export default page