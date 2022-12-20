import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Profile } from '@screens/Profile'

const { Screen, Navigator } = createNativeStackNavigator()

export function ProfileStack() {
  return (
    <Navigator initialRouteName='Profile' screenOptions={{ headerShown: false }}>
      <Screen name='Profile' component={Profile} />
    </Navigator>
  )
}
