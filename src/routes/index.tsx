import { NavigationContainer } from '@react-navigation/native'

import { TabRoutes } from './tab.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
      {/* <TabRoutes /> */}
    </NavigationContainer>
  )
}
