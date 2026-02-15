import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
// import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "neumorphic"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {

        const variants = {
            default: "bg-primary text-primary-foreground shadow-sm hover:opacity-90 hover:shadow-md active:translate-y-0 transition-all duration-200 border border-primary/10",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
            outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 shadow-sm transition-all duration-200",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-900",
            link: "text-primary underline-offset-4 hover:underline",
            neumorphic: "bg-white text-slate-700 shadow-neu-flat hover:shadow-neu-sm active:shadow-neu-pressed border border-slate-100",
        }

        const sizes = {
            default: "h-11 px-6 rounded-xl text-sm",
            sm: "h-9 rounded-lg px-3 text-xs",
            lg: "h-14 rounded-xl px-8 text-base",
            icon: "h-11 w-11 rounded-xl",
        }

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
                    variants[variant as keyof typeof variants],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
