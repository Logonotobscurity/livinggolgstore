
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:brightness-110',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-accent hover:text-accent-foreground',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2.5',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  showIcon?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      showIcon = false,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), 'group', 'gap-2.5')}
        ref={ref}
        {...props}
      >
        {children}
        {showIcon && size !== 'icon' && (
          <div className={cn(
            "relative grid place-items-center w-6 h-6 rounded-full",
            {
                "bg-primary-foreground text-primary": variant === 'default' || variant === 'destructive' || variant === 'secondary',
                "bg-primary text-primary-foreground": variant === 'outline' || variant === 'ghost' || variant === 'link'
            }
            )}>
             <div className="grid place-content-center transition-all w-full h-full group-hover:transform group-hover:-translate-y-5 group-hover:translate-x-5">
                <Icons.arrow className='w-3 h-3' />
                <Icons.arrow className='absolute w-3 h-3 transform -translate-x-5 translate-y-5' />
            </div>
          </div>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

