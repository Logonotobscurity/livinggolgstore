
'use client';

import { useState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Icons } from './icons';
import { submitSubscriptionForm } from '@/app/actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { LivingGoldWordmark } from './logo';
import { useResponsive } from '@/hooks/use-responsive';

const subscriptionFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }).optional().or(z.literal('')),
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

const MODAL_DISMISSED_KEY = 'subscription_modal_dismissed';
const MODAL_DECLINED_KEY = 'subscription_modal_declined';

export default function SubscriptionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { isMobile } = useResponsive();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasBeenDismissed = localStorage.getItem(MODAL_DISMISSED_KEY);
    const hasBeenDeclined = localStorage.getItem(MODAL_DECLINED_KEY);

    if (hasBeenDeclined) {
      setIsDeclined(true);
      return;
    }

    if (!hasBeenDismissed) {
      const handleScroll = () => {
        if (window.scrollY > document.documentElement.scrollHeight * 0.25) {
          setIsOpen(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };

      const timer = setTimeout(() => {
        setIsOpen(true);
        window.removeEventListener('scroll', handleScroll);
      }, 5000); 

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      email: '',
      phone: '',
    },
  });

  const onSubmit = (values: SubscriptionFormValues) => {
    startTransition(async () => {
      const result = await submitSubscriptionForm(values);
      if (result.success) {
        toast({
          title: 'Subscription Successful!',
          description: result.message,
        });
        localStorage.setItem(MODAL_DISMISSED_KEY, 'true');
        localStorage.removeItem(MODAL_DECLINED_KEY); 
        setIsOpen(false);
        setIsDeclined(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.message,
        });
      }
    });
  };

  const handleDecline = () => {
    localStorage.setItem(MODAL_DISMISSED_KEY, 'true');
    localStorage.setItem(MODAL_DECLINED_KEY, 'true');
    setIsDeclined(true);
    setIsOpen(false);
  };

  const FormContent = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4 sm:px-0">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email Address"
                  {...field}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
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
              <FormLabel className="sr-only">Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  {...field}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full !mt-6"
          disabled={isPending}
        >
          {isPending ? (
            <Icons.loader className="h-4 w-4 animate-spin" />
          ) : (
            'Continue'
          )}
        </Button>
      </form>
    </Form>
  );

  const renderContent = (isDrawer: boolean) => (
    <>
      {isDrawer ? (
        <DrawerHeader className="text-center">
            <LivingGoldWordmark className="h-12 w-auto mx-auto mb-4 text-primary" />
            <DrawerTitle className="font-headline text-3xl font-bold text-primary mb-2">10% Off</DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
                Sign up for LIVING GOLD email + texts to save 10% on your order.
            </DrawerDescription>
        </DrawerHeader>
      ) : (
        <DialogHeader className="text-center">
            <LivingGoldWordmark className="h-12 w-auto mx-auto mb-4 text-primary" />
            <DialogTitle className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-2">10% Off</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
                Sign up for LIVING GOLD email + texts to save 10% on your order.
            </DialogDescription>
        </DialogHeader>
      )}

      <div className="mt-4">
        <FormContent />
      </div>

      {isDrawer ? (
        <DrawerFooter className="pt-4">
            <Button
              variant="link"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleDecline}
            >
              Decline Offer
            </Button>
            <p className="text-xs text-muted-foreground/80 text-center">
              *Some brands are excluded, see qualifying designs.
            </p>
        </DrawerFooter>
      ) : (
        <DialogFooter className="mt-4 flex-col sm:flex-col sm:space-x-0">
            <Button
              variant="link"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleDecline}
            >
              Decline Offer
            </Button>
            <p className="text-xs text-muted-foreground/80 text-center mt-4">
              *Some brands are excluded, see qualifying designs.
            </p>
        </DialogFooter>
      )}
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="bg-secondary text-foreground p-4">
            {renderContent(true)}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-secondary text-foreground w-[90vw] rounded-lg sm:max-w-md p-6 sm:p-8">
            {renderContent(false)}
          </DialogContent>
        </Dialog>
      )}
      
      <div
        className={cn(
          'fixed bottom-4 right-4 z-50 transition-transform duration-300 ease-in-out',
          isDeclined && !isOpen ? 'translate-y-0' : 'translate-y-[200%]'
        )}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="shadow-lg"
        >
          Get 10% Off
        </Button>
      </div>
    </>
  );
}
