'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icons } from '@/components/icons';

import { submitSignUpForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                 <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-transparent border-input text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="bg-transparent border-input text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    {...field}
                    className="bg-transparent border-input text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={isPending}
              showIcon={!isPending}
              size="lg"
            >
              {isPending ? (
                <Icons.loader className="h-4 w-4 animate-spin" />
              ) : (
                'Create Account'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
