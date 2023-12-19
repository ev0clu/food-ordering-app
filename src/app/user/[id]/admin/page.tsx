'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import CategoryTab from '@/components/CategoryTab';

const Admin = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const { id } = params;

  if (status === 'unauthenticated') {
    return router.push('/login');
  }

  if (session?.user.role !== 'ADMIN') {
    return router.push(`/user/${id}/profile`);
  }

  return (
    <div className="flex flex-grow flex-col">
      <h1 className="text-top my-5 text-4xl font-bold">Admin</h1>
      <Tabs defaultValue="category" className="w-[320px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
        </TabsList>
        <TabsContent value="category">
          <CategoryTab />
        </TabsContent>
        <TabsContent value="menu">Menu</TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
