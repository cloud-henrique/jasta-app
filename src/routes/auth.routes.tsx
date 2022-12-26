import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignUp } from '@screens/SignUp'
import { SignIn } from '@screens/SignIn'
import { Notes } from '@screens/Notes'

export function AuthRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator()
  
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUp' component={SignUp} />
      <Screen name='Notes' component={Notes} />
    </Navigator>
  )
}
