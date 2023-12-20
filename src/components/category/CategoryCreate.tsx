'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/ErrorMessage';
import { Loader2 } from 'lucide-react';
import { categoryFormSchema } from '@/lib/validation/categoryFormSchema';

type formType = z.infer<typeof categoryFormSchema>;

interface CategoryCreateProps {
  handleCategoryRefetch: () => void;
}

const CategoryCreate = ({
  handleCategoryRefetch
}: CategoryCreateProps) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      categoryName: ''
    }
  });

  const onSubmit = async (
    data: z.infer<typeof categoryFormSchema>
  ) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/category/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryName: data.categoryName
        })
      });

      if (response.ok) {
        setSubmitting(false);
        setValue('categoryName', '');
        handleCategoryRefetch();
        toast.success(
          `Category: ${data.categoryName} has been created successfully`
        );
      } else {
        setSubmitting(false);
        setValue('categoryName', '');
        const body = await response.json();
        if (body.message) {
          toast.error(body.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    } catch (error) {
      setSubmitting(false);
      setValue('categoryName', '');
      toast.error('An unexpected error is occured');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-8 mt-5 flex max-w-md flex-col gap-3"
    >
      <div className="flex flex-col space-y-2">
        <Input
          disabled={isSubmitting}
          id="categoryName"
          autoComplete="off"
          type="text"
          placeholder="Category name"
          {...register('categoryName')}
        />
        <ErrorMessage>{errors.categoryName?.message}</ErrorMessage>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="flex w-28 gap-1 text-right"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create
        </Button>
      </div>
    </form>
  );
};

export default CategoryCreate;
