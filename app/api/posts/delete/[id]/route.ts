import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    const { id } = params;
  
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
      await prisma.post.delete({
        where: { id: Number(id) },
      });
      return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error deleting post' }, { status: 500 });
    }
  }
  