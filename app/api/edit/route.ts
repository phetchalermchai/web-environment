export const dynamic = 'force-static'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
 
export async function GET() {

  const getToken = async () => {
    const session: any = await getServerSession(authOptions)
    let token
    if (session && session.jwt) {
      token = session.jwt
    }
    return token
  }
  const token = await getToken()
 
  return Response.json({ token })
}