'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SessionReminder() {
  const { totalItemsCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { toast } = useToast();
  const [reminderShown, setReminderShown] = useState(false);

  useEffect(() => {
    // Prevent hydration issues by ensuring this runs only on the client
    if (typeof window === 'undefined' || reminderShown) {
      return;
    }

    const sessionKey = 'session_reminder_shown';
    const hasBeenShownThisSession = sessionStorage.getItem(sessionKey);

    if (!hasBeenShownThisSession) {
      const timer = setTimeout(() => {
        if (totalItemsCount > 0) {
          setReminderShown(true);
          sessionStorage.setItem(sessionKey, 'true');
          toast({
            title: 'Welcome back!',
            description: `You have ${totalItemsCount} item(s) in your cart.`,
            action: (
              <Button asChild variant="secondary">
                <Link href="/cart">View Cart</Link>
              </Button>
            ),
            duration: 8000,
          });
        } else if (wishlistItems.length > 0) {
          setReminderShown(true);
          sessionStorage.setItem(sessionKey, 'true');
          toast({
            title: 'Welcome back!',
            description: `You have ${wishlistItems.length} item(s) in your wishlist.`,
            action: (
              <Button asChild variant="secondary">
                <Link href="/wishlist">View Wishlist</Link>
              </Button>
            ),
            duration: 8000,
          });
        }
      }, 2000); // Delay to make it less intrusive

      return () => clearTimeout(timer);
    } else {
        setReminderShown(true);
    }
  }, [totalItemsCount, wishlistItems.length, toast, reminderShown]);

  return null; // This component does not render anything
}
