'use client';

import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/ErrorMessage';
import { Loader2 } from 'lucide-react';
import { authFormSchema } from '@/lib/validation/authFormSchema';
import { AuthProfileProps } from '@/types/profile';

type formType = z.infer<typeof authFormSchema>;

type AuthProps = {
  id: string;
  authProfile: AuthProfileProps;
  handleUpdateAuth: (username: string, email: string) => void;
};

const AuthProfile = ({
  id,
  authProfile,
  handleUpdateAuth
}: AuthProps) => {
  const { data: session } = useSession();

  const [isSubmitting, setSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  useEffect(() => {
    setValue('username', authProfile.username);
    setValue('email', authProfile.email);
  }, []);

  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    try {
      setSubmitting(true);

      const response = await fetch(`/api/user/${id}/auth/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password
        })
      });

      if (response.ok) {
        handleUpdateAuth(data.username, data.email);
        setIsEdit(false);
        setSubmitting(false);
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
      setSubmitting(false);
      toast.error('An unexpected error is occured');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-8 mt-5 flex max-w-md flex-col gap-3"
    >
      <div className="flex flex-col space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          disabled={!isEdit}
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
          disabled={!isEdit}
          id="email"
          autoComplete="email"
          type="email"
          placeholder="email@example.com"
          {...register('email')}
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </div>
      {session?.user.provider !== 'GOOGLE' && (
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
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
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
      {session?.user.provider !== 'GOOGLE' && (
        <>
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
                className="flex w-28 gap-1 text-right"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update
              </Button>
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default AuthProfile;
