
'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitSignUpForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { NeumorphicForm } from './neumorphic-form';

const signUpFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const formFields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone Number', type: 'tel' },
];

export function SignUpForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    startTransition(async () => {
      const result = await submitSignUpForm(values);
      if (result.success) {
        toast({
          title: 'Welcome!',
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
      title="Create Account"
      buttonText="Sign Up"
      isPending={isPending}
    />
  );
}
