'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ErrorMessage from '@/components/ErrorMessage';
import { toast } from 'sonner';
import { Button, buttonVariants } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { registerFormSchema } from '@/lib/validation/registerFormSchema';

type formType = z.infer<typeof registerFormSchema>;

const Register = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      street: '',
      city: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (
    data: z.infer<typeof registerFormSchema>
  ) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          street: data.street,
          city: data.city,
          phone: data.phone,
          password: data.password,
          confirmPassword: data.confirmPassword
        })
      });
      if (response.ok) {
        router.push('/auth/login');
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
      toast.error('An unexpected error is occured');
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mb-8 mt-5 flex max-w-sm flex-col gap-3"
      >
        <div className="flex flex-col">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            autoComplete="username"
            type="text"
            placeholder="Username"
            {...register('username')}
          />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            autoComplete="email"
            type="email"
            placeholder="email@example.com"
            {...register('email')}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="street">Street</Label>
          <Input
            id="street"
            autoComplete="street"
            type="text"
            placeholder="street"
            {...register('street')}
          />
          <ErrorMessage>{errors.street?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            autoComplete="city"
            type="city"
            placeholder="city"
            {...register('city')}
          />
          <ErrorMessage>{errors.city?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            autoComplete="phone"
            type="tel"
            placeholder="+4859657"
            {...register('phone')}
          />
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            autoComplete="off"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            autoComplete="off"
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
          />
          <ErrorMessage>
            {errors.confirmPassword?.message}
          </ErrorMessage>
          <ErrorMessage>{errors.root?.message}</ErrorMessage>
        </div>
        <p>
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className={cn(buttonVariants({ variant: 'link' }), 'p-1')}
          >
            Log in
          </Link>
        </p>
        <Button
          className="mx-auto w-28"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Register
        </Button>
      </form>
    </>
  );
};

export default Register;
