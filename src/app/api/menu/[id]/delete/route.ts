import { NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/client';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleteMenuItem = await prisma.menu.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json(
      {
        menuItem: null,
        message: `Menu: ${deleteMenuItem.name} with ${params.id} has been removed from the database`
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
