'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2, Pencil, X } from 'lucide-react';
import { categoryFormSchema } from '@/lib/validation/categoryFormSchema';
import { Category } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/DeleteModal';
import ErrorMessage from '@/components/ErrorMessage';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

type formType = z.infer<typeof categoryFormSchema>;

interface CategoryItemProps {
  category: Category;
  editId: string;
  handleCategoryRefetch: () => void;
  handleCategoryEdit: (id: string) => void;
}

const CategoryItem = ({
  category,
  editId,
  handleCategoryRefetch,
  handleCategoryEdit
}: CategoryItemProps) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  useEffect(() => {
    setValue('categoryName', category.name);
  }, []);

  const onSubmit = async (
    data: z.infer<typeof categoryFormSchema>
  ) => {
    try {
      setSubmitting(true);
      const toastId = toast.loading('Updating ...');

      const response = await fetch(
        `/api/category/${category.id}/update`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            categoryName: data.categoryName
          })
        }
      );

      if (response.ok) {
        setIsEdit(false);
        setSubmitting(false);
        handleCategoryRefetch();
        toast.dismiss(toastId);
        toast.success(
          `Category: ${data.categoryName} has been updated successfully`
        );
      } else {
        setSubmitting(false);
        const body = await response.json();
        if (body.message) {
          toast.error(body.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      }
      handleCategoryEdit('');
    } catch (error) {
      setSubmitting(false);
      handleCategoryEdit('');
      toast.error('An unexpected error is occured');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-8 mt-5 flex max-w-md flex-row gap-2"
    >
      <div className="flex flex-col space-y-2">
        <Input
          disabled={!isEdit || editId !== category.id}
          id={`categoryName-${category.id}`}
          autoComplete="off"
          type="text"
          placeholder="Category Name"
          {...register('categoryName')}
        />
        <ErrorMessage>{errors.categoryName?.message}</ErrorMessage>
      </div>

      {!isEdit || editId !== category.id ? (
        <div className="flex flex-row gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setIsEdit(true);
                    handleCategoryEdit(category.id);
                  }}
                >
                  <Pencil />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DeleteModal
            category={category}
            handleCategoryRefetch={handleCategoryRefetch}
          />
        </div>
      ) : (
        <div className="flex flex-row gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setIsEdit(false);
                    handleCategoryEdit('');
                    setValue('categoryName', category.name);
                  }}
                  disabled={isSubmitting}
                >
                  <X />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cancel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  variant="outline"
                  size="icon"
                  className="text-green-600 hover:text-green-600"
                  disabled={isSubmitting}
                >
                  <Check />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Update</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </form>
  );
};

export default CategoryItem;
