import { CartItem } from '@/lib/store';

export type OrderSchema = {
  cart: CartItem[];
  userId: string;
  email: string;
  street: string;
  city: string;
  phone: string;
};
