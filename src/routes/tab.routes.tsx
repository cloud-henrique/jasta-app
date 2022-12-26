import Icon from '@expo/vector-icons/Feather'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { theme } from '@styles/theme'

import { NotesStack } from './stacks/notes.routes'
import { SettingsStack } from './stacks/settings.routes'

const { Screen, Navigator } = createBottomTabNavigator()

export function TabRoutes() {
  return (
    <Navigator
      initialRouteName='Notes'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarStyle: { backgroundColor: theme.colors.gray[700] },
      }}
    >
      <Screen
        name='NotesStack'
        component={NotesStack}
        options={{ tabBarIcon: ({ color }) => <Icon name='list' color={color} size={28} /> }}
      />
      <Screen
        name='SettingsStack'
        component={SettingsStack}
        options={{ tabBarIcon: ({ color }) => <Icon name='settings' color={color} size={28} /> }}
      />
    </Navigator>
  )
}
