
import { cn } from '@/lib/utils';
import React from 'react';

interface AnimatedIconProps {
  icon: React.ReactNode;
  className?: string;
}

export function AnimatedIcon({ icon, className }: AnimatedIconProps) {
  return (
    <div
      className={cn(
        'relative grid h-6 w-6 place-items-center rounded-full',
        className
      )}
      aria-hidden="true"
    >
      <div className="grid h-full w-full place-content-center transition-transform duration-300 ease-in-out group-hover:-translate-x-5 group-hover:translate-y-5">
        {icon}
      </div>
      <div className="absolute grid h-full w-full place-content-center transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 translate-x-5 -translate-y-5">
         {icon}
        </div>
    </div>
  );
}
