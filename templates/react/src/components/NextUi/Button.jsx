import { extendVariants, Button as NextButton } from '@nextui-org/react';
import { Link, useMatch, useResolvedPath } from 'react-router';

const Button = extendVariants(NextButton, {
  variants: {
    color: {
      light: 'text-light-foreground bg-light hover:bg-light-600',
    },
  },
  defaultVariants: {
    color: 'primary',
    radius: 'sm',
  },
  compoundVariants: [{ className: 'font-[500]' }],
});

/** @typedef { React.ComponentProps<typeof ButtonLink> } ButtonLinkProps */
export const ButtonLink = extendVariants(Button, {
  variants: {
    /** @type { Record<string, any> } */
    to: {},
    /** @type { Record<import('react-router').RelativeRoutingType, any> } */
    relative: {},
  },
  defaultVariants: {
    as: Link,
    relative: 'path',
  },
});

/** @typedef { ButtonLinkProps } ButtonNavLinkProps */

/**
 * @param { ButtonNavLinkProps }
 * */
export function ButtonNavLink({
  to = '',
  color = 'default',
  variant = 'light',
  radius = 'none',
  ...props
}) {
  const path = useResolvedPath(to);
  const match = useMatch({ path: path.pathname, end: false });

  return (
    <ButtonLink
      className={`border-b-1 h-full border-solid px-8 ${match ? 'border-primary-500 font-[600]' : 'border-transparent font-[500]'}`}
      color={match ? 'primary' : color}
      variant={variant}
      radius={radius}
      to={to}
      {...props}
    />
  );
}
export default Button;
