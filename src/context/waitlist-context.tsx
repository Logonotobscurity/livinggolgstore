
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface WaitlistItem {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
}

interface WaitlistContextType {
  waitlistItems: WaitlistItem[];
  toggleWaitlist: (item: WaitlistItem) => void;
  isInWaitlist: (id: string) => boolean;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export const WaitlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [waitlistItems, setWaitlistItems] = useState<WaitlistItem[]>([]);

  useEffect(() => {
    const storedWaitlist = localStorage.getItem('waitlist');
    if (storedWaitlist) {
      setWaitlistItems(JSON.parse(storedWaitlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('waitlist', JSON.stringify(waitlistItems));
  }, [waitlistItems]);

  const toggleWaitlist = (item: WaitlistItem) => {
    setWaitlistItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.filter(i => i.id !== item.id);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const isInWaitlist = (id: string) => waitlistItems.some(i => i.id === id);

  return (
    <WaitlistContext.Provider value={{ waitlistItems, toggleWaitlist, isInWaitlist }}>
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
};
