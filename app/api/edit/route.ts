export const dynamic = 'force-static'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { getToken } from "next-auth/jwt"

export async function GET(  ) {

    const session = await getServerSession(authOptions)

    return Response.json({ session })
}