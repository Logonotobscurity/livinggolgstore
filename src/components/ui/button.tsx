import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium ring-offset-background transition-all duration-500 ease-in-out focus-visible:outline-none user-select-none uppercase focus-visible:text-white focus-visible:border focus-visible:border-blue-500 focus-visible:bg-blue-500 focus-visible:shadow-[0_0_5px_#008cff,0_0_20px_#008cff,0_0_50px_#008cff,0_0_100px_#008cff] focus-visible:text-shadow-[0_0_5px_#ffffff,0_0_10px_#ffffff,0_0_20px_#ffffff] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-white/50 bg-transparent text-white/50 hover:text-white hover:bg-blue-500 hover:border-blue-500 hover:shadow-[0_0_5px_#008cff,0_0_20px_#008cff,0_0_50px_#008cff,0_0_100px_#008cff] hover:text-shadow-[0_0_5px_#ffffff,0_0_10px_#ffffff,0_0_20px_#ffffff]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
