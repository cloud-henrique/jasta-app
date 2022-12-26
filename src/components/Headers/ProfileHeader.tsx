import { useRef, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import auth from '@react-native-firebase/auth'
import { HStack, IconButton, Icon, Text } from 'native-base'

import { AlertDialog } from '@components/Modals/AlertDialog'

export function ProfileHeader() {
  const cancelDeleteRef = useRef(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handleOpenModal() {
    setIsModalVisible(true)
  }

  function handleCloseModal() {
    setIsModalVisible(false)
  }

  function handleLogout() {
    auth().signOut()
  }

  return (
    <>
      <HStack bgColor='gray.700' safeAreaTop p={3} alignItems='center' justifyContent='space-between'>
        <Text bold color='gray.100' fontSize='xl'>
          Meu Perfil
        </Text>

        <IconButton
          p={1}
          onPress={handleOpenModal}
          icon={<Icon as={Feather} name='log-out' color='red.500' size={8} mr={2} />}
        />
      </HStack>

      <AlertDialog
        colorScheme='danger'
        isOpen={isModalVisible}
        onConfirm={handleLogout}
        onClose={handleCloseModal}
        leastDestructiveRef={cancelDeleteRef}
        text={{ title: 'Sair do app', content: 'Deseja realmente sair?', cancel: 'Não', confirm: 'Sair' }}
      />
    </>
  )
}
