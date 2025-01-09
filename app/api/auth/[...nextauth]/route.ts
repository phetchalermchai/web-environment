import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        };
    }

    interface User {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }

    interface JWT {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        exp?: number;
    }
}


const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {

                    const user = await prisma.user.findUnique({ // ใช้ Prisma ดึงข้อมูลผู้ใช้จากฐานข้อมูล
                        where: { email: credentials.email },
                    });

                    if (!user) {
                        throw new Error("Invalid credentials");
                    }

                    const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                    if (!passwordMatch) {
                        throw new Error("Invalid credentials");
                    }

                    return { id: user.id.toString(), firstName: user.firstname, lastName: user.lastname, email: user.email };

                } catch (error) {
                    console.error("Authentication error:", error);
                    throw new Error("Invalid credentials");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.email = user.email;

                // กำหนดเวลาหมดอายุของ JWT (6 ชั่วโมง)
                const sixHoursInSeconds: number = 6 * 60 * 60;

                if (typeof token.exp === "undefined" || typeof token.exp !== "number") {
                    token.exp = 0; // ค่าเริ่มต้น เพื่อให้ TypeScript ยอมรับ
                    console.log(typeof token.exp); // ควรแสดง 'number'
                    console.log(typeof sixHoursInSeconds); // ควรแสดง 'number'
                }

                token.exp = Math.floor(Date.now() / 1000) + sixHoursInSeconds;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    firstName: token.firstName as string,
                    lastName: token.lastName as string,
                    email: token.email as string
                };
                session.expires = new Date(token.exp! * 1000).toISOString();
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/secure/gateway/login", // กำหนดหน้าเข้าสู่ระบบ
        signOut: '/custom-logout',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions }; // ส่งออก `authOptions` หากต้องการใช้ใน server-side
