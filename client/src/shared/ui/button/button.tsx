import { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonVariants = 'primary' | 'outlined' | 'dangerous';

type ButtonSizes = 'sm';

type ButtonProps = React.ComponentPropsWithRef<'button'> & {
  children: React.ReactNode;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  icon?: React.ReactNode;
  uppercase?: boolean;
};

const variants = {
  primary:
    'border-2 border-transparent bg-blue-100 text-white hover:bg-blue-200',
  outlined:
    'border-2 border-blue-100 bg-transparent text-blue-100 hover:bg-blue-100 hover:text-white',
  dangerous:
    'border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white',
} as const;

const sizes = {
  sm: 'px-20 py-15',
} as const;

const disabledVariants = {
  common: 'disabled:pointer-events-none',
  primary: 'disabled:bg-gray-100',
  outlined: 'disabled:border-gray-100 disabled:text-gray-100',
  dangerous: 'disabled:border-gray-100 disabled:text-gray-100',
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'sm',
      uppercase = true,
      children,
      icon,
      className,
      ...buttonProps
    },
    ref
  ) => {
    return (
      <button
        {...buttonProps}
        ref={ref}
        className={twMerge(
          clsx(
            'flex items-center justify-center gap-x-10 rounded-8 text-16 font-700 transition-colors active:translate-y-1',
            sizes[size],
            variants[variant],
            disabledVariants[variant],
            disabledVariants.common,
            { ['uppercase']: uppercase },
            className
          )
        )}
      >
        {children}
        {icon}
      </button>
    );
  }
);

Button.displayName = 'Button';
