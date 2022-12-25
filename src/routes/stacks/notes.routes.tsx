import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Notes } from '@screens/Notes'

const { Screen, Navigator } = createNativeStackNavigator()

export function NotesStack() {
  return (
    <Navigator initialRouteName='Notes' screenOptions={{ headerShown: false }}>
      <Screen name='Notes' component={Notes} />
    </Navigator>
  )
}
