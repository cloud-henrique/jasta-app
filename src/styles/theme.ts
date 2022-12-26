import { extendTheme } from 'native-base'
import colors from 'native-base/lib/typescript/theme/base/colors'

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  colors: {
    primary: {
      // 50: '#eef2ff',
      // 100: '#e0e7ff',
      // 200: '#c7d2fe',
      // 300: '#a5b4fc',
      // 400: '#818cf8',
      500: '#8284FA',
      // 600: '#4f46e5',
      700: '#5E60CE',
      // 800: '#3730a3',
      // 900: '#312e81',
    },
    secondary: {
      // 50: '#ecfdf5',
      // 100: '#d1fae5',
      // 200: '#a7f3d0',
      // 300: '#6ee7b7',
      // 400: '#34d399',
      500: '#4EA8DE',
      // 600: '#059669',
      700: '#1E6F9F',
      // 800: '#065f46',
      // 900: '#064e3b',
    },
    tertiary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
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
  components: {
    Button: {
      sizes: {
        lg: { h: 14, _text: { fontSize: 'md', fontWeight: '600' } },
        md: { _text: { fontWeight: 500 } },
        sm: { _text: { fontWeight: 500 } },
        xs: { _text: { fontWeight: 500 } },
      },
      variants: {
        solid: { bg: 'primary.500', _pressed: { bg: 'primary.700' } },
      },
    },
    Input: {
      defaultProps: {
        h: 14,
        px: 4,
        rounded: 'lg',
        bg: 'gray.500',
        color: 'gray.100',
        fontSize: 'md',
        borderWidth: 1,
        borderColor: 'gray.700',
        keyboardAppearance: 'dark',
        placeholderTextColor: 'gray.300',
        _focus: {
          bg: 'gray.500',
          borderWidth: 1,
          cursorColor: 'gray.100',
          borderColor: 'primary.500',
          selectionColor: 'gray.100',
        },
      },
    },
  },
})
