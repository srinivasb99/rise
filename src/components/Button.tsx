import React from 'react';
import { cn } from '../utils/cn'; // Assuming you have this utility

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

// Define base and variant styles
const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap overflow-hidden text-ellipsis dark:focus-visible:ring-offset-gray-800';

const variantStyles = {
  primary: 'bg-[#002B5B] text-white hover:bg-[#003872] focus-visible:ring-[#002B5B] dark:bg-blue-400 dark:text-[#001F3F] dark:hover:bg-blue-300 dark:focus-visible:ring-blue-400',
  secondary: 'bg-[#E0F0FF] text-[#002B5B] hover:bg-[#cce3ff] focus-visible:ring-[#E0F0FF] dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus-visible:ring-gray-700',
  outline: 'border-2 border-[#002B5B] text-[#002B5B] hover:bg-[#E0F0FF] focus-visible:ring-[#002B5B] dark:border-blue-400 dark:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-blue-200 dark:focus-visible:ring-blue-400',
};

const sizeStyles = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-12 px-8 text-lg',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className // Allow overriding
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
