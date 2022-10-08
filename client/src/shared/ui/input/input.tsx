import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';

type InputSizes = 'sm';
type InputVariants = 'primary';

type InputProps = {
  size?: InputSizes;
  fullWidth?: boolean;
  variant?: InputVariants;
  icon?: React.ReactNode;
  label?: string;
  error?: string;
} & Omit<React.ComponentPropsWithRef<'input'>, 'size'>;

const sizes = {
  sm: 'py-13',
} as const;

const variants = {
  primary: 'bg-white border-gray-100 focus:border-black-500',
} as const;

const errorClasses =
  'text-red-500 border-red-500 placeholder:text-red-500 focus:border-red-500';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'sm',
      variant = 'primary',
      fullWidth = false,
      icon,
      className,
      label,
      id,
      error,
      ...inputProps
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          'flex w-full flex-col gap-y-5',
          {
            ['w-300']: !fullWidth,
          },
          className
        )}
      >
        {Boolean(label) && (
          <label
            htmlFor={id}
            className={twMerge(
              clsx('text-14 font-300 text-black-500', {
                ['text-red-500']: Boolean(error),
              })
            )}
          >
            {label}
          </label>
        )}
        <div className="relative flex w-full flex-col gap-10">
          <input
            {...inputProps}
            ref={ref}
            id={id}
            className={twMerge(
              clsx(
                'placeholder:text-gray-10 w-full rounded-16 border-2 pl-13 pr-40 text-16 outline-none transition-colors',
                sizes[size],
                variants[variant],
                {
                  [errorClasses]: Boolean(error),
                  ['placeholder:text-red-500']: Boolean(error),
                }
              )
            )}
          />
          {Boolean(icon) && (
            <span className="absolute right-5 top-1/2 -translate-x-5 -translate-y-1/2">
              {icon}
            </span>
          )}
        </div>
        {Boolean(error) && (
          <span className="text-14 font-300 text-red-500 empty:hidden">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
