'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Loader2, Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import noImageUrl from '../../../public/no-image.png';
import { formatPrice } from '@/lib/utils';
import { useSession } from 'next-auth/react';

import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { orderFormSchema } from '@/lib/validation/orderFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type formType = z.infer<typeof orderFormSchema>;

const deliveryFee = 2;

const formattedDeliveryFee = formatPrice(deliveryFee, {
  currency: 'EUR',
  notation: 'compact'
});

const Cart = () => {
  const [mount, setMount] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: session } = useSession();

  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  const form = useForm<formType>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      username: '',
      email: '',
      street: '',
      city: '',
      phone: ''
    }
  });

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    if (mount) {
      form.setValue('username', session?.user.username || '');
      form.setValue('email', session?.user.email || '');
      form.setValue('street', session?.user.street || '');
      form.setValue('city', session?.user.city || '');
      form.setValue('phone', session?.user.phone || '');
    }
  }, [mount]);

  const initialPrice = 0;
  const totalCartPrice = cart.reduce((total, item) => {
    const itemPrice = item.menu.price * item.quantity;
    return total + itemPrice;
  }, initialPrice);

  const formattedTotalCartPrice = formatPrice(
    totalCartPrice + deliveryFee,
    {
      currency: 'EUR',
      notation: 'compact'
    }
  );

  const onSubmit = async (data: z.infer<typeof orderFormSchema>) => {
    try {
      setSubmitting(true);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: cart,
          userId: session?.user.id,
          customerName: data.username,
          email: data.email,
          street: data.street,
          city: data.city,
          phone: data.phone
        })
      });

      if (response.ok) {
        setSubmitting(false);
        toast.success(`Order is created.`);
      } else {
        setSubmitting(false);
        const body = await response.json();
        if (body.message) {
          toast.error(body.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    } catch (error) {
      setSubmitting(false);
      toast.error('An unexpected error is occured');
    }
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="my-5">
        <ScrollArea className="h-96">
          <div className="space-y-2">
            {cart.map((item, index) => (
              <div key={item.menu.id + index}>
                <div className="flex flex-row items-center justify-between gap-3">
                  <div className="flex flex-row items-center gap-2">
                    {item.menu.images.length === 0 ? (
                      <div className="hidden h-[100px] flex-col justify-center p-1 sm:flex">
                        <Image
                          src={noImageUrl}
                          alt="No image"
                          width="100"
                          height="100"
                          placeholder="blur"
                          blurDataURL={`${noImageUrl}`}
                          loading="lazy"
                          className="rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="hidden h-[100px] flex-col justify-center p-1 sm:flex">
                        <Image
                          src={`${item.menu.images[0].url}`}
                          alt={item.menu.images[0].id}
                          width="100"
                          height="100"
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
                        disabled={item.quantity === 1 ? true : false}
                        type="button"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => {
                          if (item.quantity > 1) {
                            decreaseQuantity(item.menu.id, item.size);
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
                          increaseQuantity(item.menu.id, item.size)
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
                        removeFromCart(item.menu.id, item.size)
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
        <div>
          <div className="mb-2 flex flex-row justify-end gap-2">
            <div>Delivery:</div>
            <span>{formattedDeliveryFee}</span>
          </div>
          <div className="mb-10 flex flex-row justify-end gap-2">
            <div>Total:</div>
            <span> {formattedTotalCartPrice}</span>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mb-8 mt-5 flex max-w-md flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="text"
                    placeholder="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="text"
                    placeholder="street"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="text"
                    placeholder="city"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="tel"
                    placeholder="+4859657"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="flex w-28 gap-1 text-right"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Pay
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Cart;
