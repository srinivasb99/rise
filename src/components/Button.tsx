import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-[#002B5B] text-white hover:bg-[#003872] focus-visible:ring-[#002B5B]':
            variant === 'primary',
          'bg-[#E0F0FF] text-[#002B5B] hover:bg-[#cce3ff] focus-visible:ring-[#E0F0FF]':
            variant === 'secondary',
          'border-2 border-[#002B5B] text-[#002B5B] hover:bg-[#E0F0FF] focus-visible:ring-[#002B5B]':
            variant === 'outline',
          'h-9 px-4 text-sm': size === 'sm',
          'h-11 px-6 text-base': size === 'md',
          'h-12 px-8 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
