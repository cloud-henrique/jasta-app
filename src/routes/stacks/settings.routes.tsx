import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Settings } from '@screens/Settings'

const { Screen, Navigator } = createNativeStackNavigator()

export function SettingsStack() {
  return (
    <Navigator initialRouteName='Settings' screenOptions={{ headerShown: false }}>
      <Screen name='Settings' component={Settings} />
    </Navigator>
  )
}