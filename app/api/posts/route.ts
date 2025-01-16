import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { id: true, firstname: true, lastname: true, email: true }, // เลือกข้อมูลผู้เขียนที่ต้องการ
        },
      },
      orderBy: {
        createdAt: 'desc', // เรียงลำดับจากล่าสุด
      },
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}
