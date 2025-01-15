import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"
import prisma from '@/lib/prisma';
import { generateExcerpt } from "@/utils/generateExcerpt";
import { v4 as uuidv4 } from 'uuid';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function POST(req: Request , res: Response) {
    const session = await getServerSession(req ,res ,authOptions);
    // const session = await getServerSession(req, {
    //     ...authOptions,
    //     callbacks: {
    //         ...authOptions.callbacks,
    //         async session({ session, token, user }) {
    //             if (session?.user) {
    //                 session.user.id = token.sub;
    //                 session.user.role = token.role
    //             }
    //             return session;
    //         },
    //         async jwt({ token, user }) {
    //             if (user) {
    //                 token.sub = user.id.toString()
    //                 token.role = user.role
    //             }
    //             return token
    //         },
    //     }
    // })
    console.log(session);
    

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized. Please login' }, { status: 401 });
    }

    try {
        const { title, content, coverImage, images } = await req.json();

        if (!title || !content) {
            return NextResponse.json({ message: 'Title and content are required.' }, { status: 400 });
        }

        const slug = `${title.toLowerCase().replace(/ /g, '-')}-${uuidv4().substring(0, 8)}`;
        const excerpt = generateExcerpt(content);

        const newPost = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                coverImage,
                images: images ? JSON.stringify(images) : null,
                author: { connect: { id: parseInt(session.user.id) } },
            },
        });

        return NextResponse.json({ message: 'Post created successfully.', post: newPost }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);

        if (error.code === 'P2002') {
            return NextResponse.json({ message: 'Title already exists. Please use a different title.' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Something went wrong. Please try again later.' }, { status: 500 });
    }
}