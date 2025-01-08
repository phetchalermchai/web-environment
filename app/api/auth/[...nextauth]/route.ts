import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface User {
    id: string;
    name: string;
    email: string;
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
        };
    }
    interface JWT {
        id: string;
        name: string;
        email: string;
    }
}

const users = [
    {
        id: "1",
        name: "Admin",
        email: "phetangelb@gmail.com",
        password: await bcrypt.hash("Abc123456789@", 10), // เก็บรหัสผ่านที่แฮชแล้ว
    },
];

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials) return null;

                const user = users.find(u => u.email === credentials.email);

                if (user && (await bcrypt.compare(credentials.password, user.password))) {
                    return { id: user.id, name: user.name, email: user.email };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name as string,
                    email: token.email as string,
                };
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
