import React from 'react';
import { cn } from '../../lib/utils';

// FIX: Update props to support both button and anchor attributes for a polymorphic component.
// The original props which extended both ButtonHTMLAttributes and AnchorHTMLAttributes caused type conflicts.
// By creating a discriminated union based on the `as` prop, we ensure that only valid attributes for either a button or an anchor can be passed, resolving type errors.
type BaseProps = {
  variant?: 'primary' | 'secondary';
};

type ButtonAsButtonProps = BaseProps & {
  as?: 'button';
} & React.ComponentPropsWithoutRef<'button'>;

type ButtonAsAnchorProps = BaseProps & {
  as: 'a';
} & React.ComponentPropsWithoutRef<'a'>;

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const Button: React.FC<ButtonProps> = (props) => {
  const baseClasses = 'inline-block px-6 py-3 rounded-md font-semibold tracking-wide transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black text-center';

  const variants = {
    primary: 'bg-neutral-200 text-black hover:bg-white focus:ring-white font-bold transform hover:scale-[1.03]',
    secondary: 'bg-transparent border border-neutral-500 text-neutral-200 hover:bg-neutral-900 hover:border-neutral-400 focus:ring-neutral-500 transform hover:scale-[1.03]',
  };
  
  if (props.as === 'a') {
    const { as, variant = 'primary', className, children, ...rest } = props;
    return (
      // FIX: The spread props are now correctly typed as anchor attributes, removing the type error.
      <a className={cn(baseClasses, variants[variant], className)} {...rest}>
        {children}
      </a>
    );
  }

  const { as, variant = 'primary', className, children, ...rest } = props;
  return (
    <button className={cn(baseClasses, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
