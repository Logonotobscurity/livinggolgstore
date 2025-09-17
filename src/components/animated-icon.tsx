
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
        'relative grid place-items-center w-6 h-6 rounded-full',
        className
      )}
    >
      <div className="grid place-content-center transition-all w-full h-full group-hover:transform group-hover:-translate-y-5 group-hover:translate-x-5 group-focus-visible:transform group-focus-visible:-translate-y-5 group-focus-visible:translate-x-5">
        {icon}
        <div className="absolute transform -translate-x-5 translate-y-5">
         {icon}
        </div>
      </div>
    </div>
  );
}
