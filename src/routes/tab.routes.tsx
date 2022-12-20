import Icon from '@expo/vector-icons/Feather'
import { useTheme } from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'

const { Screen, Navigator } = createBottomTabNavigator()

export function TabRoutes() {
  const { colors } = useTheme()

  return (
    <Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.PRIMARY,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        tabBarStyle: { backgroundColor: colors.BACKGROUND, height: 88 },
      }}
    >
      <Screen
        name='Home'
        component={Home}
        options={{ tabBarLabel: 'Notas', tabBarIcon: ({ color }) => <Icon name='list' color={color} size={28} /> }}
      />
      <Screen
        name='Profile'
        component={Profile}
        options={{ tabBarLabel: 'Perfil', tabBarIcon: ({ color }) => <Icon name='user' color={color} size={28} /> }}
      />
    </Navigator>
  )
}
