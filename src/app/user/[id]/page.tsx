'use client';

import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/ErrorMessage';
import { Loader2 } from 'lucide-react';
import { registerFormSchema } from '@/lib/validation/registerFormSchema';

type formType = z.infer<typeof registerFormSchema>;

type ProfileProps = {
  profile: {
    username: string;
    email: string;
    street: string;
    city: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
};

const Profile = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const { id } = params;

  const [isSubmitting, setSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          cache: 'no-cache'
        });

        if (response.ok) {
          const data: ProfileProps = await response.json();
          setValue('username', data.profile.username);
          setValue('email', data.profile.email);
          setValue('street', data.profile.street);
          setValue('city', data.profile.city);
          setValue('phone', data.profile.phone);
        } else {
          setIsError(true);
          toast.error('An unexpected error occurred');
        }
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        toast.error('An unexpected error is occured');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (
    data: z.infer<typeof registerFormSchema>
  ) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/user/profile/update', {
        method: 'PUT',
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
        router.refresh();
        setIsEdit(false);
        toast.success('Profile has been updated successfully');
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

  if (isLoading) {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    return router.push('/login');
  }
  console.log(session?.user.login);
  return (
    <div className="flex flex-grow flex-col">
      <h1 className="text-top text-4xl font-bold">Profile</h1>
      {!isError ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-8 mt-5 flex max-w-md flex-col gap-3"
        >
          {session?.user.login !== 'GOOGLE' && (
            <>
              <div className="flex flex-col">
                <Label htmlFor="username">Username</Label>
                <Input
                  disabled={!isEdit}
                  id="username"
                  autoComplete="username"
                  type="text"
                  placeholder="Username"
                  {...register('username')}
                />
                <ErrorMessage>
                  {errors.username?.message}
                </ErrorMessage>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  disabled={!isEdit}
                  id="email"
                  autoComplete="email"
                  type="email"
                  placeholder="email@example.com"
                  {...register('email')}
                />
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
              </div>
            </>
          )}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input
              disabled={!isEdit}
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
              disabled={!isEdit}
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
              disabled={!isEdit}
              id="phone"
              autoComplete="phone"
              type="tel"
              placeholder="+4859657"
              {...register('phone')}
            />
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          </div>
          {session?.user.login !== 'GOOGLE' && (
            <>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  disabled={!isEdit}
                  id="password"
                  autoComplete="off"
                  type="password"
                  placeholder="Password"
                  {...register('password')}
                />
                <ErrorMessage>
                  {errors.password?.message}
                </ErrorMessage>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <Input
                  disabled={!isEdit}
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
            </>
          )}

          {!isEdit ? (
            <div className="my-5 text-right">
              <Button
                type="button"
                className="mx-auto w-28"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </Button>
            </div>
          ) : (
            <div className="my-5 flex flex-row justify-between">
              <Button
                type="button"
                className="w-28 text-left"
                onClick={() => setIsEdit(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex w-28 gap-3 text-right"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update
              </Button>
            </div>
          )}
        </form>
      ) : (
        <p className="m-auto text-lg">Something went wrong</p>
      )}
    </div>
  );
};

export default Profile;
