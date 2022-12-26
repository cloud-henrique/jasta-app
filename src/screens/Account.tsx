import auth from '@react-native-firebase/auth'
import { Button, Center, Image, Input, Text, VStack } from 'native-base'

import { SettingsHeader } from '@components/Headers/SettingsHeader'

export function Account() {
  const user = auth().currentUser

  return (
    <>
      <SettingsHeader title='Conta' backButton />

      <VStack bg='gray.600' flex={1} px={3}>
        <Center>
          <Image
            mt={10}
            mb={3}
            h={150}
            w={150}
            rounded='full'
            alt='foto de perfil do usuário'
            source={{ uri: user?.photoURL || 'https://github.com/cloud-henrique.png' }}
          />
          <Text bold color='primary.500' fontSize='sm'>
            Alterar foto
          </Text>
        </Center>

        <VStack py={2}>
          <Text color='gray.200'>Nome</Text>
          <Input placeholder='Nome' />
        </VStack>

        <VStack py={2}>
          <Text color='gray.200'>E-mail</Text>
          <Input isDisabled value={user?.email ?? ''} />
        </VStack>

        <Button mt={4}>Salvar alterações</Button>
      </VStack>
    </>
  )
}
