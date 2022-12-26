import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { HStack, Icon, Pressable, Text } from 'native-base'

interface SettingsHeaderProps {
  title: string
  backButton?: boolean
}

export function SettingsHeader({ backButton, title }: SettingsHeaderProps) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <HStack bgColor='gray.700' safeAreaTop p={3} alignItems='center'>
      {backButton ? (
        <Pressable onPress={handleGoBack}>
          <Icon as={<Feather name='chevron-left' />} color='white' size={6} mr={6} />
        </Pressable>
      ) : null}

      <Text bold color='gray.100' fontSize='xl'>
        {title}
      </Text>
    </HStack>
  )
}
