import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);
  
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, content, coverImage, images } = await req.json();
  const slug = `${title.toLowerCase().replace(/ /g, '-')}-${Date.now()}`;
  const excerpt = content.substring(0, 200);

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        images: images ? JSON.parse(JSON.stringify(images)) : Prisma.JsonNull, // ใช้ Prisma.JsonNull แทน null
        authorId: Number(session.user.id),
        published: false, // Default to unpublished
      },
    });
    return NextResponse.json({ message: 'Post created successfully', post: newPost }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
  }
}
