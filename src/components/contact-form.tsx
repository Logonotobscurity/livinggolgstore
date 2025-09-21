
'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { NeumorphicForm } from './neumorphic-form';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const formFields = [
  { name: 'name', label: 'Your Name', type: 'text' },
  { name: 'email', label: 'Your Email', type: 'email' },
  { name: 'message', label: 'Your Message', type: 'text' },
];

export function ContactForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    startTransition(async () => {
      const result = await submitContactForm(values);
      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.message,
        });
      }
    });
  };

  return (
    <NeumorphicForm
      form={form}
      onSubmit={onSubmit}
      fields={formFields}
      title="Drop us a line"
      buttonText="Submit"
      isPending={isPending}
    />
  );
}
