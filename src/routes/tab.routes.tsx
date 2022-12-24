import Icon from '@expo/vector-icons/Feather'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { theme } from '@styles/theme'

import { Notes } from '@screens/Notes'
import { Profile } from '@screens/Profile'

const { Screen, Navigator } = createBottomTabNavigator()

export function TabRoutes() {
  return (
    <Navigator
      initialRouteName='Notes'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary[500],
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        tabBarStyle: { backgroundColor: theme.colors.gray[700], height: 88 },
      }}
    >
      <Screen
        name='Notes'
        component={Notes}
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
