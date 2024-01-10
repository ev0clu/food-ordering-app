import { CartItem } from '@/lib/store';
import { Order, User } from '@prisma/client';
import { CartItem as CartItemModel } from '@prisma/client';

export type OrderSchema = {
  cart: CartItem[];
  userId: string;
  customerName: string;
  email: string;
  street: string;
  city: string;
  phone: string;
};

interface ExtendedCartItemModel extends CartItemModel {
  menu: Menu;
}

export interface ExtendedOrder extends Order {
  cartItems: ExtendedCartItemModel[];
  user: User;
}
