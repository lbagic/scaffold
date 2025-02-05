import { commonColors } from '@nextui-org/react';

/** @satisfies { Partial<import('@nextui-org/react').ThemeColors> } */
export const palette = {
  background: '#FFFBF4',
  foreground: {
    ...commonColors.zinc,
    DEFAULT: '#4C3E2F',
  },
  muted: '#7C6E5F',
  default: {
    ...commonColors.zinc,
    foreground: '#4C3E2F',
    DEFAULT: commonColors.zinc[300],
  },
  divider: '#ddd',
  content1: {
    DEFAULT: '#EFEBE4', // modal color, card color
    foreground: '#4C3E2F',
  },
  content2: {
    DEFAULT: '#ecf0ff',
    foreground: '#4C3E2F',
  },
  light: {
    50: '#FFFFFF',
    100: '#FFFFFF',
    200: '#FFFDFA',
    300: '#FFFDFA',
    400: '#FFFBF5',
    500: '#FFFBF4',
    600: '#FFF8EB',
    700: '#FFF6E5',
    800: '#FFF2DB',
    900: '#FFF0D6',
    foreground: '#525252',
    DEFAULT: '#FFFBF4',
  },
  primary: {
    50: '#ecf0ff',
    100: '#dde4ff',
    200: '#c2cdff',
    300: '#9cabff',
    400: '#757dff',
    500: '#6664ff',
    600: '#4736f5',
    700: '#3d2ad8',
    800: '#3225ae',
    900: '#2c2689',
    foreground: '#FFFBF4',
    DEFAULT: '#6664ff',
  },
  secondary: {
    50: '#fbfbfb',
    100: '#f8f6f4',
    200: '#efece5',
    300: '#dfd7c9',
    400: '#cabca7',
    500: '#baa58d',
    600: '#a5876a',
    700: '#97775f',
    800: '#7e6150',
    900: '#675045',
    foreground: '#ffffff',
    DEFAULT: '#baa58d',
  },
};
