'use client';

import { useState } from 'react';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import CategoryHandling from '@/components/CategoryCreate';

const Profile = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const { id } = params;

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    return router.push('/login');
  }

  if (session?.user.role !== 'ADMIN') {
    return router.push(`/user/${id}/profile`);
  }

  return (
    <div className="flex flex-grow flex-col">
      <h1 className="text-top my-5 text-4xl font-bold">Admin</h1>
      {!isError ? (
        <Tabs defaultValue="category" className="w-[320px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="category">Category</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
          </TabsList>
          <TabsContent value="category">
            <CategoryHandling />
          </TabsContent>
          <TabsContent value="menu">Menu</TabsContent>
        </Tabs>
      ) : (
        <p className="m-auto text-lg">Something went wrong</p>
      )}
    </div>
  );
};

export default Profile;
