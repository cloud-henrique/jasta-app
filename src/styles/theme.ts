import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    primary: {
      500: '#8284FA',
      700: '#5E60CE',
    },
    secondary: {
      500: '#4EA8DE',
      700: '#1E6F9F',
    },
    gray: {
      100: '#F2F2F2',
      200: '#D9D9D9',
      400: '#333333',
      300: '#808080',
      500: '#262626',
      600: '#1A1A1A',
      700: '#0D0D0D',
    },
    danger: {
      500: '#E25858',
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Inter',
  },
  fontConfig: {
    Inter: {
      100: { normal: 'Inter-100' },
      200: { normal: 'Inter-200' },
      300: { normal: 'Inter-300' },
      400: { normal: 'Inter-400' },
      500: { normal: 'Inter-500' },
      600: { normal: 'Inter-600' },
      700: { normal: 'Inter-700' },
      800: { normal: 'Inter-800' },
      900: { normal: 'Inter-900' },
    },
  },
  sizes: {
    14: 56,
  },
})
