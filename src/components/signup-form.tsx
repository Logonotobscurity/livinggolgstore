
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icons } from '@/components/icons';

import { submitSignUpForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

const signUpFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

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
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={cn("neumorphic-card w-full")}>
            <a className="neumorphic-title text-center">Create Account</a>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="neumorphic-input-box">
                  <FormControl>
                    <input type="text" {...field} required id="signup-name" />
                  </FormControl>
                  <FormLabel htmlFor="signup-name">Name</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="neumorphic-input-box">
                  <FormControl>
                    <input type="email" {...field} required id="signup-email" />
                  </FormControl>
                  <FormLabel htmlFor="signup-email">Email</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="neumorphic-input-box">
                  <FormControl>
                    <input type="tel" {...field} required id="signup-phone" />
                  </FormControl>
                  <FormLabel htmlFor="signup-phone">Phone Number</FormLabel>
                </FormItem>
              )}
            />
            <button
              type="submit"
              disabled={isPending}
              className="neumorphic-button"
            >
              {isPending ? (
                <Icons.loader className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
