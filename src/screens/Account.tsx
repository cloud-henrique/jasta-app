import { SettingsHeader } from '@components/Headers/SettingsHeader'
import auth from '@react-native-firebase/auth'
import { HStack, Image, Text, VStack } from 'native-base'

export function Account() {
  const user = auth().currentUser

  return (
    <VStack bg='gray.600' flex={1}>
      <SettingsHeader title='Conta' backButton />
      
      <HStack p={3} m={3} rounded='md' bg='gray.500' borderWidth={1} alignItems='center' borderColor='gray.400'>
        <Image
          h={50}
          w={50}
          rounded='full'
          alt='foto de perfil do usuário'
          source={{ uri: user?.photoURL || 'https://github.com/cloud-henrique.png' }}
        />
      
        <VStack ml={2}>
          <Text>{user?.displayName}</Text>
          <Text>{user?.email}</Text>
        </VStack>
      </HStack>
    </VStack>
  )
}
