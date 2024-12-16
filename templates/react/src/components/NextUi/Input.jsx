import Button from '@/components/NextUi/Button';
import {
  Calendar,
  extendVariants,
  Input as NextInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { CalendarBlank, MagnifyingGlass } from '@phosphor-icons/react';

const Input = extendVariants(NextInput, {
  defaultVariants: {
    variant: 'underlined',
    size: 'lg',
  },
});

export const InputSearch = extendVariants(Input, {
  defaultVariants: {
    variant: 'underlined',
    size: 'lg',
    endContent: <MagnifyingGlass className="text-primary-500" weight="bold" />,
  },
});

/** @param { import('@nextui-org/react').CalendarProps } */
export function InputCalendar(props) {
  return (
    <Popover
      placement="bottom"
      classNames={{ content: 'p-0 bg-none border-none' }}
    >
      <PopoverTrigger>
        <Button
          startContent={<CalendarBlank />}
          isIconOnly
          variant="bordered"
        />
      </PopoverTrigger>
      <PopoverContent>
        <Calendar {...props} />
      </PopoverContent>
    </Popover>
  );
}

export default Input;
