import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';
import { getServerSession } from 'next-auth';

export const revalidate = 0;

export async function GET() {
  const session = await getServerSession();
  try {
    const orderListbyUserId = await prisma.order.findMany({
      where: {
        userId: session?.user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true,
        cartItems: {
          include: {
            menu: true // Include Menu details within cartItems
          }
        }
      }
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
