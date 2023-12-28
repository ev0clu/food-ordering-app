import { NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/client';
import { menuFormSchema } from '@/lib/validation/menuFormSchema';
import { formatPrice } from '@/lib/utils';

export const revalidate = 0;

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: typeof menuFormSchema = await req.json();

    const {
      menuName,
      menuDescription,
      menuImage, // Assuming menuImage is an array of objects with id and url properties
      menuSize,
      menuCategory,
      menuPrice
    } = menuFormSchema.parse(body);

    const categoryIds: { id: string }[] = menuCategory.map(
      (categoryId: string) => ({
        id: categoryId
      })
    );

    const formattedPrice = formatPrice(menuPrice, {
      currency: 'EUR',
      notation: 'compact'
    });

    // Retrieve existing images associated with the menu
    const existingImages = await prisma.image.findMany({
      where: { menuId: params.id }
    });

    // Extract URLs from existing images
    const existingImageUrls = existingImages.map(
      (image) => image.url
    );

    // Extract URLs from new menu images
    const newMenuImageUrls = menuImage.map((image) => image.url);

    // Find URLs to be removed (exist in existing but not in new)
    const urlsToRemove = existingImageUrls.filter(
      (url) => !newMenuImageUrls.includes(url)
    );

    // Find URLs to be added (exist in new but not in existing)
    const urlsToAdd = newMenuImageUrls.filter(
      (url) => !existingImageUrls.includes(url)
    );

    // Remove images with URLs that are not in the new array
    await prisma.image.deleteMany({
      where: {
        menuId: params.id,
        url: {
          in: urlsToRemove
        }
      }
    });

    // Create new images with URLs that are not in the existing array
    const newImages = urlsToAdd.map((url) => {
      return prisma.image.create({
        data: {
          url,
          menuId: params.id
        }
      });
    });

    // Perform the database operations
    await prisma.$transaction([...newImages]);

    const updatedMenu = await prisma.menu.update({
      where: { id: params.id },
      data: {
        name: menuName,
        description: menuDescription,
        size: menuSize,
        price: formattedPrice,
        categories: {
          set: categoryIds
        }
      },
      include: {
        categories: true,
        images: true
      }
    });

    return NextResponse.json(
      {
        message: `Menu id:${params.id} is updated`
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
