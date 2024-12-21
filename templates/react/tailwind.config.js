import { nextui } from '@nextui-org/react';
import { palette } from './theme.config';

/** @type { import('tailwindcss').Config } */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: { x: '4.5rem', y: '1.5rem' },
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
    }),
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '1280px',
        md: '1280px',
        lg: '1280px',
        xl: '1280px',
        '2xl': '1280px',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: '',
      defaultTheme: 'light',
      layout: {
        radius: { small: '4px', medium: '8px', large: '12px' },
      },
      themes: {
        light: { colors: palette },
      },
    }),
    titlesPlugin([{ size: 16 }, { size: 18 }, { size: 20 }, { size: 24 }]),
    gridPlugin(),
  ],
};

/**
 * @template [T=unknown]
 * @typedef { (config?: T) => import('tailwindcss/types/config').PluginCreator } Plugin
 */

/** @type { Plugin<{ size: number, weight?: number, lineHeight?: number }[]> } */
function titlesPlugin(titles = []) {
  return function ({ addUtilities }) {
    if (!titles.length) return;
    const utilities = {};
    titles.forEach(({ size, weight: fontWeight = 400, lineHeight = 1.2 }) => {
      utilities[`.title-${size}`] = {
        fontSize: `${size}px`,
        fontWeight: `${fontWeight}`,
        lineHeight: `${lineHeight}`,
      };
    });
    addUtilities(utilities);
  };
}

/** @type { Plugin } */
function gridPlugin() {
  return function ({ matchUtilities }) {
    matchUtilities(
      {
        'grid-auto-fit': value => ({
          gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr)) /* Variable width items */`,
        }),
        'grid-auto-fill': value => ({
          gridTemplateColumns: `repeat(auto-fill, ${value}) /* Fixed width items */`,
        }),
      },
      {
        values: { 100: '100px', 150: '150px', 200: '200px', 250: '250px' },
        supportsArbitraryValues: true,
      }
    );
  };
}
