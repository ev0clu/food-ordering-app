'use client';

import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/ErrorMessage';
import { Loader2 } from 'lucide-react';
import { contactFormSchema } from '@/lib/validation/contactFormSchema';
import { ContactProfileProps } from '@/types/profile';

type formType = z.infer<typeof contactFormSchema>;

interface ContactProps {
  id: string;
  contactProfile: ContactProfileProps;
  handleUpdateContact: (
    street: string,
    city: string,
    phone: string
  ) => void;
}

const ContactProfile = ({
  id,
  contactProfile,
  handleUpdateContact
}: ContactProps) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      street: '',
      city: '',
      phone: ''
    }
  });

  useEffect(() => {
    setValue('street', contactProfile.street);
    setValue('city', contactProfile.city);
    setValue('phone', contactProfile.phone);
  }, []);

  const onSubmit = async (
    data: z.infer<typeof contactFormSchema>
  ) => {
    try {
      setSubmitting(true);

      const response = await fetch(`/api/user/${id}/contact/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          street: data.street,
          city: data.city,
          phone: data.phone
        })
      });

      if (response.ok) {
        setIsEdit(false);
        setSubmitting(false);
        handleUpdateContact(data.street, data.city, data.phone);
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
    </form>
  );
};

export default ContactProfile;
