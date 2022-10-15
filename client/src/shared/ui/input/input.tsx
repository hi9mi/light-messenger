import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';

type InputSizes = 'lg' | 'md' | 'sm' | 'xs';
type InputVariants = 'outline' | 'filled' | 'flushed';
type InputColors = 'blue' | 'green' | 'gray';

type InputBaseProps = {
  size?: InputSizes;
  variant?: InputVariants;
  color?: InputColors;
  fullWidth?: boolean;
  label?: string;
  rightAdornment?: React.ReactNode;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isOptional?: boolean;
  htmlSize?: number;
} & Omit<
  React.ComponentPropsWithRef<'input'>,
  | 'size'
  | 'disabled'
  | 'ariaDisabled'
  | 'required'
  | 'readOnly'
  | 'ariaRequired'
>;

type RequiredInputProps = InputBaseProps & {
  isRequired?: boolean;
  isOptional?: never;
};

type OptionalInputProps = InputBaseProps & {
  isRequired?: never;
  isOptional?: boolean;
};

type InputProps = RequiredInputProps | OptionalInputProps;

const sizes = {
  xs: 'h-24 text-11',
  sm: 'h-32 text-13',
  md: 'h-40 text-16',
  lg: 'h-48 text-16',
} as const;

const variants = {
  outline: 'rounded-16 border-2 bg-transparent pl-16 focus:bg-transparent',
  filled: 'rounded-16 border-2 pl-16',
  flushed:
    'rounded-2 border-b-2 bg-transparent pl-5 focus:bg-transparent focus:outline-0',
} as const;

const colors = {
  gray: 'border-gray bg-black-100 placeholder:text-gray-100 focus:border-black focus:bg-white',
  blue: 'border-blue-200 bg-blue placeholder:text-blue-200 focus:border-blue-300 focus:bg-white',
  green:
    'border-green-200 bg-green placeholder:text-green-200 focus:border-green-300 focus:bg-white',
} as const;

const disabledClasses = 'cursor-not-allowed';
const commonClasses =
  'outline-none focus:outline-1 focus:outline-offset-1 focus:outline-gray-100';

const REQUIRED_INPUT_LABEL_TEXT = ' (required)';
const OPTIONAL_INPUT_LABEL_TEXT = ' (optional)';
const DEFAULT_INPUT_WIDTH = 'w-300';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'outline',
      color = 'gray',
      fullWidth = false,
      label,
      rightAdornment,
      isInvalid,
      isDisabled,
      isReadOnly,
      isRequired,
      isOptional,
      htmlSize,
      id,
      className,
      ...inputProps
    },
    ref
  ) => {
    return (
      <div
        className={twMerge(
          clsx(
            'flex w-full flex-col gap-y-5 text-black-500',
            {
              [DEFAULT_INPUT_WIDTH]: !fullWidth,
              [`text-red-500`]: isInvalid,
            },
            className
          )
        )}
      >
        {Boolean(label) && (
          <label
            htmlFor={id}
            data-invalid={isInvalid}
            data-disabled={isDisabled}
            data-required={isRequired}
            className={twMerge(
              clsx('text-14 font-300', {
                [disabledClasses]: isDisabled,
              })
            )}
          >
            {label}
            {isRequired && REQUIRED_INPUT_LABEL_TEXT}
            {isOptional && OPTIONAL_INPUT_LABEL_TEXT}
          </label>
        )}
        <div className="relative flex w-full flex-col gap-10">
          <input
            {...inputProps}
            ref={ref}
            id={id}
            size={htmlSize}
            disabled={isDisabled}
            readOnly={isReadOnly}
            aria-disabled={isDisabled}
            aria-invalid={isInvalid}
            aria-required={isRequired}
            className={twMerge(
              clsx(
                'w-full pr-40 transition-colors',
                commonClasses,
                sizes[size],
                colors[color],
                variants[variant],
                {
                  [disabledClasses]: isDisabled,
                  ['border-red-500 placeholder:text-red-500']: isInvalid,
                }
              )
            )}
          />
          {Boolean(rightAdornment) && (
            <span
              data-invalid={isInvalid}
              data-disabled={isDisabled}
              className="absolute right-8 top-1/2 -translate-x-8 -translate-y-1/2"
            >
              {rightAdornment}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
