
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { AnimatedIcon } from '../animated-icon';
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
    const Comp = asChild ? Slot : 'button';
    const iconColorClass =
      variant === 'default' ||
      variant === 'destructive' ||
      variant === 'secondary'
        ? 'bg-primary-foreground text-primary'
        : 'bg-primary text-primary-foreground';

    if (asChild) {
      const child = React.Children.only(children);
       return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }), 'group', 'gap-2.5')}
          ref={ref}
          {...props}
        >
          {React.isValidElement(child) ? 
            React.cloneElement(child, {
              ...child.props,
              className: cn('flex items-center gap-2.5', child.props.className),
              children: (
                <>
                  {child.props.children}
                  {showIcon && size !== 'icon' && (
                    <AnimatedIcon
                      icon={<Icons.arrow className="w-3 h-3" />}
                      className={iconColorClass}
                    />
                  )}
                </>
              )
            }) : children}
        </Slot>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), 'group', 'gap-2.5')}
        ref={ref}
        {...props}
      >
        {children}
        {showIcon && size !== 'icon' && (
          <AnimatedIcon
            icon={<Icons.arrow className="w-3 h-3" />}
            className={iconColorClass}
          />
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
