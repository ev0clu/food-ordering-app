'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button, buttonVariants } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import noImageUrl from '../../public/no-image.png';
import Loading from '@/components/Loading';
import { formatPrice } from '@/lib/utils';

const Cart = () => {
  const { cart, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  const { increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const initialValue = 0;
  const totalCartItems = cart.reduce(
    (total, currentValue) => total + currentValue.quantity,
    initialValue
  );

  const initialPrice = 0;
  const totalCartPrice = cart.reduce((total, item) => {
    const itemPrice = item.menu.price * item.quantity;
    return total + itemPrice;
  }, initialPrice);

  const formattedTotalCartPrice = formatPrice(totalCartPrice, {
    currency: 'EUR',
    notation: 'compact'
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant={'outline'} className="relative">
          <ShoppingCart />
          {mounted && cart.length > 0 ? (
            <span className="absolute -top-1 left-5 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">
              {totalCartItems}
            </span>
          ) : (
            ''
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="space-y-3">
          {mounted ? (
            cart.length === 0 ? (
              <div className="spaxe-y-1 flex flex-col items-center justify-center">
                <p className="m-auto my-5 text-lg">Cart is empty</p>
                <Link
                  href="/menu"
                  className={buttonVariants({
                    variant: 'link',
                    size: 'sm',
                    className: 'text-sm text-muted-foreground'
                  })}
                >
                  Add menu to your cart to checkout
                </Link>
              </div>
            ) : (
              <div className="my-5">
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {cart.map((item, index) => (
                      <div key={item.menu.id + index}>
                        <div className="flex flex-row items-center justify-between gap-3">
                          <div className="flex flex-row items-center gap-2">
                            {item.menu.images.length === 0 ? (
                              <div className="hidden h-[50px] flex-col justify-center p-1 sm:flex">
                                <Image
                                  src={noImageUrl}
                                  alt="No image"
                                  width="50"
                                  height="50"
                                  placeholder="blur"
                                  blurDataURL={`${noImageUrl}`}
                                  loading="lazy"
                                  className="rounded-md"
                                />
                              </div>
                            ) : (
                              <div className="hidden h-[50px] flex-col justify-center p-1 sm:flex">
                                <Image
                                  src={`${item.menu.images[0].url}`}
                                  alt={item.menu.images[0].id}
                                  width="50"
                                  height="50"
                                  placeholder="blur"
                                  blurDataURL={`${item.menu.images[0].url}`}
                                  loading="lazy"
                                  className="rounded-md"
                                />
                              </div>
                            )}
                            <div className="space-y-1">
                              <h1>{item.menu.name}</h1>
                              <div className="text-sm text-muted-foreground">
                                {item.size}
                              </div>
                              <span className="text-sky-400">
                                {formatPrice(item.menu.price, {
                                  currency: 'EUR',
                                  notation: 'compact'
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row gap-3">
                            <div className="flex flex-row items-center gap-1">
                              <Button
                                disabled={
                                  item.quantity === 1 ? true : false
                                }
                                type="button"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    decreaseQuantity(
                                      item.menu.id,
                                      item.size
                                    );
                                  }
                                }}
                              >
                                <Minus className="h-5 w-5" />
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                type="button"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  increaseQuantity(
                                    item.menu.id,
                                    item.size
                                  )
                                }
                              >
                                <Plus className="h-5 w-5" />
                              </Button>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="mr-2 h-7 w-7"
                              onClick={() =>
                                removeFromCart(
                                  item.menu.id,
                                  item.size
                                )
                              }
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                        <Separator className="mt-2" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex flex-row justify-end gap-2">
                  <div>Total:</div>
                  <span> {formattedTotalCartPrice}</span>
                </div>
                <SheetFooter className="mt-10 flex flex-col gap-2 sm:flex-row">
                  <Button type="button" onClick={clearCart}>
                    Clear Cart
                  </Button>
                  <SheetClose asChild>
                    <Button type="button">Checkout</Button>
                  </SheetClose>
                </SheetFooter>
              </div>
            )
          ) : (
            <Loading />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
