import { CartItem } from '@/lib/store';
import { Order, Menu, User } from '@prisma/client';

export type OrderSchema = {
  cart: CartItem[];
  userId: string;
  customerName: string;
  email: string;
  street: string;
  city: string;
  phone: string;
};

export interface ExtendedOrder extends Order {
  menus: Menu[];
  user: User;
}
