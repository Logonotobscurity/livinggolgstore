
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icons } from '@/components/icons';

import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

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
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
           <div className={cn("neumorphic-card w-full")}>
              <a className="neumorphic-title text-center">Drop us a line</a>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="neumorphic-input-box">
                    <FormControl>
                      <input type="text" {...field} required />
                    </FormControl>
                    <span>Your Name</span>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="neumorphic-input-box">
                    <FormControl>
                       <input type="email" {...field} required />
                    </FormControl>
                     <span>Your Email</span>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="neumorphic-input-box">
                    <FormControl>
                      <input type="text" {...field} required />
                    </FormControl>
                     <span>Your Message</span>
                  </FormItem>
                )}
              />
              <button type="submit" disabled={isPending} className="neumorphic-button">
                {isPending ? (
                  <Icons.loader className="h-4 w-4 animate-spin mx-auto" />
                ) : (
                  'Submit'
                )}
              </button>
           </div>
        </form>
      </Form>
    </div>
  );
}

    