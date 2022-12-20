import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '@screens/Home'

const { Screen, Navigator } = createNativeStackNavigator()

export function HomeStack() {
  return (
    <Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Screen name='Home' component={Home} />
    </Navigator>
  )
}
