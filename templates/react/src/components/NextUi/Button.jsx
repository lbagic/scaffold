import { extendVariants, Button as NextButton } from '@nextui-org/react';
import { forwardRef } from 'react';
import { Link } from 'react-router';

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

export const ButtonLink = extendVariants(Button, {
  variants: {
    to: /** @type { Record<string, any> } */ ({}),
    relative:
      /** @type { Record<import('react-router').RelativeRoutingType, any> } */ ({}),
  },
  defaultVariants: {
    as: forwardRef((props, ref) => <Link ref={ref} {...props} />),
    relative: 'path',
  },
});

export default Button;
