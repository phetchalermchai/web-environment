import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

declare module "next-auth" {
    interface User {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        role: string;
        avatar: string | null;
    }

    interface AdapterUser {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        role: string;
        avatar: string;
    }

    interface Session {
        user: {
            id: string;
            firstname: string;
            lastname: string;
            email: string;
            role: string;
            avatar: string;
        };
    }

    interface JWT {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        role: string;
        avatar: string;
    }
}

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    select: { id: true, firstname: true, lastname: true, email: true, password: true, role: true, avatar: true },
                });

                if (!user) throw new Error("Invalid credentials");

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordMatch) throw new Error("Invalid credentials");

                return {
                    id: user.id.toString(),
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.firstname = user.firstname;
                token.lastname = user.lastname;
                token.email = user.email;
                token.role = user.role;
                token.avatar = user.avatar;
            }
            
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    firstname: token.firstname as string,
                    lastname: token.lastname as string,
                    email: token.email as string,
                    role: token.role as string,
                    avatar: token.avatar as string
                };
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/secure/gateway/login",
    },
    session: {
        strategy: "jwt", // ใช้ JSON Web Token เป็นวิธีจัดการ session
        maxAge: 6 * 60 * 60, // กำหนดเวลา 6 ชั่วโมง (6 ชั่วโมง = 21600 วินาที)
    },
    secret: process.env.AUTH_SECRET,
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };
