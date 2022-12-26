import { extendTheme } from 'native-base'

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  colors: {
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    secondary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
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
        lg: { h: 14, _text: { fontSize: 'md', fontWeight: 500 } },
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
