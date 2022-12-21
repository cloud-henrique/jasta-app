import React from 'react'
import { StatusBar } from 'react-native'

import { useFonts } from 'expo-font'
import 'react-native-get-random-values'
import { NativeBaseProvider } from 'native-base'

import { Routes } from './src/routes'
import { theme } from './src/styles/theme'

import { Loading } from './src/components/Loading'

export function App() {
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
    <NativeBaseProvider theme={theme}>
      <>
        <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
        {loaded ? <Routes /> : <Loading accessibilityLabel='Loading app' />}
      </>
    </NativeBaseProvider>
  )
}
