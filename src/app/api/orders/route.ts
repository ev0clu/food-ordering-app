import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';
import { getSession } from 'next-auth/react';

export const revalidate = 0;

export async function GET() {
  const session = await getSession();
  try {
    const orderListbyUserId = await prisma.order.findMany({
      where: {
        userId: session?.user.id
      },

      include: { user: true, menus: true }
    });

    return NextResponse.json(
      {
        orderList: orderListbyUserId,
        message: `All orders to userId: ${session?.user.id} are returned`
      },
      { status: 200 }
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
