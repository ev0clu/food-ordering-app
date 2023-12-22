import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';
import { menuFormSchema } from '@/lib/validation/menuFormSchema';
import { formatPrice } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body: typeof menuFormSchema = await req.json();

    const {
      menuName,
      menuDescription,
      menuSize,
      menuCategory,
      menuPrice
    } = menuFormSchema.parse(body);

    // Validation with safeParse
    /* const validation = userSchema.safeParse(body);
    if (!validation.success) {
      NextResponse.json(validation.error.format(), { status: 400 });
    }*/

    const existMenuByName = await prisma.menu.findUnique({
      where: {
        name: menuName
      }
    });

    if (existMenuByName) {
      return NextResponse.json(
        {
          menu: null,
          message: 'Menu already exist'
        },
        {
          status: 409
        }
      );
    }

    const categoryIds = menuCategory.map((categoryId) => ({
      id: categoryId
    }));

    const formattedPrice = formatPrice(menuPrice, {
      currency: 'EUR',
      notation: 'compact'
    });

    const newMenu = await prisma.menu.create({
      data: {
        name: menuName,
        description: menuDescription,
        size: menuSize,
        price: formattedPrice,
        categories: {
          connect: categoryIds
        }
      }
    });

    return NextResponse.json(
      {
        menu: newMenu,
        message: 'Menu created'
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
