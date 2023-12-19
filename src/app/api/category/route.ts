import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';

export async function GET(req: Request) {
  try {
    const categoryList = await prisma.category.findMany();

    return NextResponse.json(
      {
        categoryList: categoryList,
        message: `Category list with records are returned`
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
