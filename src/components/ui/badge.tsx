import * as React from 'react'
import { cn } from '@/lib/utils'

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-primary text-white',
    secondary: 'bg-gray-100 text-primary',
    destructive: 'bg-red-500 text-white',
    outline: 'border-2 border-primary text-primary',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = 'Badge'

export { Badge }
