import { z } from 'zod';

export const menuFormSchema = z.object({
  menuName: z.string().min(1, 'Menu name is required').max(20).trim(),
  menuDescription: z
    .string()
    .min(1, 'Menu description is required')
    .max(20)
    .trim(),
  menuImage: z
    .array(
      z.object({
        url: z.string().url({ message: 'Invalid URL' })
      })
    )
    .max(3, 'Maximum 3 piece of image can be set'),
  menuSize: z.enum(['SMALL', 'NORMAL']),
  menuCategory: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.'
    }),
  menuPrice: z
    .string()
    .refine((val) => Number(val) > 0.1 && Number(val) < 999.9, {
      message: 'Menu price should be between 0.1 ... 999.9'
    })
});
