'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Category } from '@prisma/client';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type DeleteCategoryModalProps = {
  category: Category;
  handleCategoryRefetch: () => void;
};

const DeleteCategoryModal = ({
  category,
  handleCategoryRefetch
}: DeleteCategoryModalProps) => {
  const deleteFetch = () =>
    fetch(`/api/category/${category.id}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      if (response.ok) {
        handleCategoryRefetch();
      } else {
        return response.json;
      }
    });

  const handleDeleteClick = async () => {
    toast.promise(deleteFetch, {
      loading: 'Delete ...',
      success: `Category: ${category.name} has been deleted successfully`,
      error: (err) => `Error: ${err.toString()}`
    });
  };

  return (
    <>
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="icon">
                  <Trash2 />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="max-w-[325px] md:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{`Delete: ${category.name}`}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? You can't
              undo this.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button
                type="button"
                className="mx-auto w-28"
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteCategoryModal;
