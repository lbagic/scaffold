import { extendVariants, Card as NextCard } from '@nextui-org/react';

const Card = extendVariants(NextCard, {
  defaultVariants: {
    shadow: 'none',
    radius: 'md',
  },
});

export default Card;
