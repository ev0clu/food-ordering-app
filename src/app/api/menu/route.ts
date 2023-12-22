import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';

export const revalidate = 0;

export async function GET(req: Request) {
  try {
    // Validation with safeParse
    /* const validation = userSchema.safeParse(body);
    if (!validation.success) {
      NextResponse.json(validation.error.format(), { status: 400 });
    }*/

    const allMenu = await prisma.menu.findMany({
      include: { categories: true }
    });

    return NextResponse.json(
      {
        menu: allMenu,
        message: 'All menu with records are returned'
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
