/**
 * Button component with multiple variants
 */

'use client';

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'bg-white text-black border border-black hover:bg-gray-50',
    ghost: 'text-gray-500 hover:text-black shadow-none bg-transparent'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', className = '', ...props }, ref) => {
        const baseStyles =
            'py-4 rounded-xl font-bold text-lg transition transform active:scale-[0.99] shadow-lg w-full';

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
