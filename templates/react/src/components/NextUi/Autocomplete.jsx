import {
  extendVariants,
  Autocomplete as NextAutocomplete,
} from '@nextui-org/react';

/** @type { typeof NextAutocomplete } */
const Autocomplete = extendVariants(NextAutocomplete, {
  defaultVariants: {
    variant: 'underlined',
    size: 'lg',
  },
});

export default Autocomplete;
