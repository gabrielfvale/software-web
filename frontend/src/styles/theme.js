import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    m180: {
      pink: {
        50: '#fae4ed',
        100: '#f4bbd2',
        200: '#ee90b4',
        300: '#e96497',
        400: '#e44480',
        500: '#D02467',
        600: '#ba2160',
      },
      navyBlue: {
        50: '#e5e8ed',
        100: '#bdc6d4',
        200: '#94a1b6',
        300: '#6d7d99',
        400: '#4e6386',
        500: '#2f4a75',
        600: '#14213d',
      },
      beige: '#F7F3ED',
      darkBeige: '#EBE8E2',
      darkPink: '#A61D52',
      purple: '#710965',
    },
  },
  dimensions: {
    navbar: '6rem',
    footer: '8rem',
  },
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
    mono: 'Menlo, monospace',
  },
  styles: {
    global: {
      body: {
        bg: 'm180.beige',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        size: 'lg',
        colorScheme: 'm180.pink',
      },
    },
  },
});

export default theme;
