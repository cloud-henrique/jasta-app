import React from 'react'
import { useColorScheme } from 'react-native'

import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components/native'

import { Routes } from './src/routes'
import themes from './src/themes'

export function App() {
  const deviceTheme = useColorScheme() || 'dark'

  const theme = themes[deviceTheme]

  const statusBarColor = deviceTheme === 'dark' ? 'light' : 'dark'

  const [loaded] = useFonts({
    'Inter-100': require('./src/assets/fonts/Inter-Thin.ttf'),
    'Inter-200': require('./src/assets/fonts/Inter-ExtraLight.ttf'),
    'Inter-300': require('./src/assets/fonts/Inter-Light.ttf'),
    'Inter-400': require('./src/assets/fonts/Inter-Regular.ttf'),
    'Inter-500': require('./src/assets/fonts/Inter-Medium.ttf'),
    'Inter-600': require('./src/assets/fonts/Inter-SemiBold.ttf'),
    'Inter-700': require('./src/assets/fonts/Inter-Bold.ttf'),
    'Inter-800': require('./src/assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-900': require('./src/assets/fonts/Inter-Black.ttf'),
  })

  if (!loaded) return null

  return (
    <ThemeProvider theme={theme}>
      <>
        <StatusBar backgroundColor='transparent' style={statusBarColor} translucent />
        <Routes />
      </>
    </ThemeProvider>
  )
}
