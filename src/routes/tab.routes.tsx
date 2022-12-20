import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'

const { Screen, Navigator } = createBottomTabNavigator()

export function TabRoutes() {
  return (
    <Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Screen name='Home' component={Home} />
      <Screen name='Profile' component={Profile} />
    </Navigator>
  )
}
