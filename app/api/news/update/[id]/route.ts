import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    const { id } = params;
    const { title, content, coverImage, images, published } = await req.json();
  
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
  
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
  
    // Check if the user is the author or a Superuser
    if (post.authorId !== Number(session.user.id) && session.user.role !== 'superuser') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  
    try {
      const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: {
          title,
          content,
          coverImage,
          images: images ? JSON.parse(JSON.stringify(images)) : Prisma.JsonNull, // ใช้ Prisma.JsonNull แทน null
          published,
        },
      });
      return NextResponse.json({ message: 'Post updated successfully', post: updatedPost }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error updating post' }, { status: 500 });
    }
  }
  