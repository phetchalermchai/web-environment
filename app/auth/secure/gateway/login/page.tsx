import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FormLogin from "@/components/Login/FormLogin"
import ImageLogin from "@/components/Login/ImageLogin"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const page = async () => {
  // ดึงข้อมูลเซสชันจากเซิร์ฟเวอร์
  const session = await getServerSession(authOptions);

  // ถ้าผู้ใช้มีเซสชันอยู่แล้ว ให้รีไดเรกต์ไปยัง `/admin`
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex">
      <ImageLogin />
      <FormLogin />
    </div>
  )
}

export default page
