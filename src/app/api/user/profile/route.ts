import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userProfile = await prisma.user.findUnique({
      where: { email: session?.user.email! }
    });

    return NextResponse.json(
      {
        profile: userProfile,
        message: `User id:${session?.user.id} records are returned`
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error
      },
      { status: 500 }
    );
  }
}
