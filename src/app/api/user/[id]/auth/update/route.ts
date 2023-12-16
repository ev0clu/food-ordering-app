import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '../../../../../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authFormSchema } from '@/lib/validation/authFormSchema';
import { AuthProfileProps } from '@/types/profile';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: AuthProfileProps = await req.json();
    const session = await getServerSession();

    // Validation with safeParse
    const validation = authFormSchema.safeParse(body);
    if (!validation.success) {
      NextResponse.json(validation.error.format(), { status: 400 });
    }

    const hashedPassword = await hash(body.password!, 10);

    const updateProfile = await prisma.user.update({
      where: { id: params.id },
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword
      }
    });

    return NextResponse.json(
      {
        message: `Profile id:${params.id} is updated`
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
