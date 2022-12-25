import { useRef, useState } from 'react'

import auth from '@react-native-firebase/auth'
import { MaterialCommunityIcons as MCIcon } from '@expo/vector-icons'
import { HStack, IconButton, Icon, Text, Button } from 'native-base'
import { AlertDialog } from '@components/AlertDialog'

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
      <HStack bgColor='gray.400' safeAreaTop p={3} alignItems='center' justifyContent='space-between'>
        <Text bold color='gray.100' fontSize='xl'>
          Meu Perfil
        </Text>

        <IconButton
          p={1}
          onPress={handleOpenModal}
          icon={<Icon as={MCIcon} name='logout-variant' color='red.500' size={8} mr={2} />}
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
