import clsx from 'clsx';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type TextSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type TextLineClamps = 'none' | '1' | '2' | '3' | '4' | '5' | '6';

type TextBaseProps = React.ComponentPropsWithRef<'p'> & {
  children: string;
  size?: TextSizes;
  lineClamp?: TextLineClamps;
};

const textFontSizes = {
  xl: 'text-18',
  lg: 'text-16',
  md: 'text-14',
  sm: 'text-13',
  xs: 'text-11',
};

const textLineClamps = {
  none: 'line-clamp-none',
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
};

export const Text = forwardRef<HTMLParagraphElement, TextBaseProps>(
  (
    { children, size = 'md', lineClamp = 'none', className, ...textProps },
    ref
  ) => {
    return (
      <p
        {...textProps}
        ref={ref}
        className={twMerge(
          clsx(
            'font-400',
            textFontSizes[size],
            textLineClamps[lineClamp],
            className
          )
        )}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';
