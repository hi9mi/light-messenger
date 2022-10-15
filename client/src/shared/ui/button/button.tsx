import { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonVariants = 'ghost' | 'outline' | 'solid' | 'link';
type ButtonSizes = 'lg' | 'md' | 'sm' | 'xs';
type ButtonColors = 'blue' | 'green' | 'gray' | 'red';

type ButtonProps = Omit<React.ComponentPropsWithRef<'button'>, 'color'> & {
  children: React.ReactNode;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  color?: ButtonColors;
  icon?: React.ReactNode;
  uppercase?: boolean;
};

const variants = {
  solid: 'text-white',
  outline: 'bg-transparent',
  ghost: 'bg-transparent',
  link: 'bg-transparent hover:bg-transparent',
} as const;

const sizes = {
  lg: 'h-48 px-20 text-16',
  md: 'h-40 px-15 text-16',
  sm: 'h-32 px-10 text-13',
  xs: 'h-24 px-8 text-11',
} as const;

const disabledVariants = {
  common: 'disabled:pointer-events-none',
  solid: 'disabled:bg-gray-100',
  outline: 'disabled:border-gray-100 disabled:text-gray-100',
  ghost: 'disabled:text-gray-100',
  link: 'disabled:no-underline disabled:text-gray-100',
} as const;

const textColor = {
  blue: 'text-blue-300 border-blue-300 hover:border-blue-300',
  green: 'text-green-300 border-green-300 hover:border-green-300',
  gray: 'text-gray-300 border-gray-300 hover:border-gray-300',
  red: 'text-red-400 border-red-400 hover:border-red-400',
};

const backgroundColors = {
  blue: 'bg-blue-100 hover:bg-blue-50',
  green: 'bg-green-100 hover:bg-green-50',
  gray: 'bg-gray-100 hover:bg-gray-50',
  red: 'bg-red-400 hover:bg-red-100',
};

const border = {
  solid: 'border-none rounded-8',
  outline: 'border rounded-8',
  ghost: 'border-none rounded-8',
  link: 'border-none underline-offset-4 hover:underline',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'sm',
      color = 'gray',
      uppercase = false,
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
            'flex items-center justify-center gap-x-10 font-700 transition-colors active:translate-y-1',
            sizes[size],
            textColor[color],
            backgroundColors[color],
            border[variant],
            variants[variant],
            disabledVariants.common,
            disabledVariants[variant],
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
