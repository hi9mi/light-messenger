import clsx from 'clsx';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type HeadingAsVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

type HeadingRef<E extends HeadingAsVariants> =
  React.ComponentPropsWithRef<E>['ref'];

type HeadingBaseProps<E extends HeadingAsVariants = 'h1'> = {
  children: string;
  as?: E;
  size?: HeadingSizes;
};

type HeadingProps<E extends HeadingAsVariants> = HeadingBaseProps<E> &
  Omit<React.ComponentPropsWithRef<E>, keyof HeadingBaseProps>;

const defaultHeadingElement = 'h1';

const headingFontSizes = {
  xl: 'text-30',
  lg: 'text-24',
  md: 'text-17',
  sm: 'text-14',
  xs: 'text-12',
};

export const Heading = forwardRef(
  <E extends HeadingAsVariants>(
    { as, children, size = 'xl', ...headingProps }: HeadingProps<E>,
    ref?: HeadingRef<E>
  ) => {
    const HeadingComponent = as || defaultHeadingElement;

    return (
      <HeadingComponent
        {...headingProps}
        ref={ref}
        className={twMerge(clsx('font-700', headingFontSizes[size]))}
      >
        {children}
      </HeadingComponent>
    );
  }
);

Heading.displayName = 'Heading';
