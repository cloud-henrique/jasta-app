import { useRef, useState } from 'react'

import auth from '@react-native-firebase/auth'
import { MaterialCommunityIcons as MCIcon } from '@expo/vector-icons'
import { HStack, IconButton, Icon, Text, AlertDialog, Button } from 'native-base'

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

  function renderAlertDialog() {
    return (
      <AlertDialog leastDestructiveRef={cancelDeleteRef} isOpen={isModalVisible} onClose={handleCloseModal}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header bgColor='gray.500' borderColor='transparent'>
            <Text color='gray.200' bold fontSize='md'>
              Sair do app
            </Text>
          </AlertDialog.Header>
          <AlertDialog.Body bgColor='gray.500'>
            <Text color='gray.200'>Deseja realmente sair?</Text>
          </AlertDialog.Body>
          <AlertDialog.Footer bgColor='gray.500' borderColor='transparent'>
            <Button.Group space={2}>
              <Button variant='unstyled' onPress={handleCloseModal} ref={cancelDeleteRef}>
                <Text color='gray.200'>Cancelar</Text>
              </Button>
              <Button colorScheme='danger' onPress={handleLogout}>
                <Text color='gray.200' fontWeight={600}>
                  Sair
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    )
  }

  return (
    <>
      {renderAlertDialog()}

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
    </>
  )
}
