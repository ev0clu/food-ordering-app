import { CartItem } from '@/lib/store';

export type OrderSchema = {
  cart: CartItem[];
  userId: string;
  customerName: string;
  email: string;
  street: string;
  city: string;
  phone: string;
};
