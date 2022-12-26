import { useRef, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import auth from '@react-native-firebase/auth'
import { AlertDialog, Button, HStack, Icon, Image, Pressable, ScrollView, Text, VStack } from 'native-base'

import { SettingsHeader } from '@components/Headers/SettingsHeader'
import { useNavigation } from '@react-navigation/native'

interface ListProps {
  icon: keyof typeof Feather.glyphMap
  title: string
  description: string
  onPress: () => void
}

export function Settings() {
  const cancelDeleteRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const navigation = useNavigation()

  const list: ListProps[] = [
    {
      icon: 'user',
      title: 'Conta',
      description: 'Editar informações da conta',
      onPress: handleAccountScreen,
    },
    {
      icon: 'shield',
      title: 'Segurança',
      description: 'Esqueci minha senha',
      onPress: () => console.log('hey'),
    },
    {
      icon: 'help-circle',
      title: 'Ajuda',
      description: 'Perguntas mais frequentes',
      onPress: () => console.log('hey'),
    },
    {
      icon: 'info',
      title: 'Sobre',
      description: 'Número de versão do aplicativo',
      onPress: () => console.log('hey'),
    },
    {
      icon: 'log-out',
      title: 'Sair',
      description: 'Sair da sua conta',
      onPress: handleOpenModal,
    },
  ]

  function handleAccountScreen() {
    navigation.navigate('Account')
  }

  function handleLogout() {
    setIsLoading(true)
    auth().signOut()
    setIsLoading(false)
  }

  function handleOpenModal() {
    setIsModalVisible(true)
  }

  function handleCloseModal() {
    setIsModalVisible(false)
  }

  function LogoutModal() {
    return (
      <AlertDialog isOpen={isModalVisible} leastDestructiveRef={cancelDeleteRef} onClose={handleCloseModal}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Sair</AlertDialog.Header>
          <AlertDialog.Body>Deseja realmente sair da sua conta?</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space='2xl'>
              <Button variant='unstyled' onPress={handleCloseModal}>
                Não
              </Button>
              <Button colorScheme='danger' onPress={handleLogout} isLoading={isLoading}>
                Sim
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    )
  }

  return (
    <VStack flex={1} bgColor='gray.600'>
      <SettingsHeader title='Configurações' />

      <LogoutModal />

      <ScrollView>
        {list.map(item => (
          <Pressable key={item.icon} onPress={item.onPress}>
            <HStack p={3} m={3} rounded='md' bg='gray.500' alignItems='center' borderWidth={1} borderColor='gray.400'>
              <Icon as={<Feather name={item.icon} />} color='gray.300' size={6} />
              <VStack ml={3} flex={1}>
                <Text fontWeight={600} fontSize='md'>
                  {item.title}
                </Text>
                <Text>{item.description}</Text>
              </VStack>
              <Icon as={<Feather name='chevron-right' />} color='gray.300' size={6} />
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </VStack>
  )
}
