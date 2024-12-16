import { extendVariants, TimeInput as NextTimeInput } from '@nextui-org/react';

const TimeInput = extendVariants(NextTimeInput, {
  defaultVariants: {
    variant: 'underlined',
    size: 'lg',
  },
});

export default TimeInput;
