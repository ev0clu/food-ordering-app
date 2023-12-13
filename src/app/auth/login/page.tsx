'use client';

import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ErrorMessage from '@/components/ErrorMessage';
import { toast } from 'sonner';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import googleLogo from '../../../../public/google_logo.svg';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email')
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(3, 'Password must have min 3 characters')
});

type formType = z.infer<typeof formSchema>;

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmittingCredentials, setSubmittingCredentials] =
    useState(false);
  const [isSubmittingGoogle, setSubmittingGoogle] = useState(false);

  /*const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');*/

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError('');
      setSubmittingCredentials(true);
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });
      if (response?.ok) {
        router.push('/');
      }
      if (response?.error) {
        setSubmittingCredentials(false);
        setError(`${response.status}: Email or password is wrong`);
      }
    } catch (error) {
      setError('An unexpected error is occured');
      setSubmittingCredentials(false);
    }
  };

  return (
    <>
      {error && toast.error(error)}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mb-8 mt-5 flex max-w-sm flex-col gap-3"
      >
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            autoComplete="email"
            className="rounded px-2 py-1 text-slate-950"
            type="email"
            placeholder="email@example.com"
            {...register('email')}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            autoComplete="off"
            className="rounded px-2 py-1"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div>
        <p>
          Do not have an account?{' '}
          <Link
            href="/auth/register"
            className={cn(buttonVariants({ variant: 'link' }), 'p-1')}
          >
            Register
          </Link>
        </p>
        <Button
          className="mx-auto w-28"
          type="submit"
          disabled={isSubmittingCredentials || isSubmittingGoogle}
        >
          {isSubmittingCredentials && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Login
        </Button>
      </form>
      <div className="mx-auto mb-8 mt-5 flex max-w-sm flex-col gap-3">
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 flex-shrink text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <Button
          type="button"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'mx-auto bg-stone-100 text-black hover:bg-stone-200 hover:text-black'
          )}
          onClick={async () => {
            setSubmittingGoogle(true);
            const response = await signIn('google', {
              callbackUrl: '/'
            });
          }}
          disabled={isSubmittingCredentials || isSubmittingGoogle}
        >
          {isSubmittingGoogle && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          <Image
            src={googleLogo}
            alt="google logo"
            width="0"
            height="0"
            className="mx-auto mr-3 h-auto w-5"
          />
          Sign in with Google
        </Button>
      </div>
    </>
  );
};

export default Login;
