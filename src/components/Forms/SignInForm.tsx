import { useState } from 'react'
import { Alert } from 'react-native'

import { Feather } from '@expo/vector-icons'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Button, Icon, useToast, VStack } from 'native-base'

import { Input } from '@components/Input'

export function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const navigation = useNavigation()

  function handleSignIn() {
    setIsLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Notes'))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }

  function handleSignUpScreen() {
    navigation.navigate('SignUp')
  }

  function handleForgotPassword() {
    setIsLoading(true)

    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Redefinir senha', `Enviamos um email para ${email}`))
      .catch(() => toast.show({ title: 'Por favor, insira um e-mail válido' }))
      .finally(() => setIsLoading(false))
  }

  return (
    <VStack>
      <Input
        mt={3}
        autoCapitalize='none'
        placeholder='E-mail'
        onChangeText={setEmail}
        keyboardType='email-address'
        returnKeyType='next'
      />
      <Input
        mt={3}
        autoCapitalize='none'
        placeholder='Senha'
        onChangeText={setPassword}
        secureTextEntry
        onSubmitEditing={handleSignIn}
      />

      <Button size='lg' my={6} isLoading={isLoading} onPress={handleSignIn}>
        Entrar
      </Button>

      <Button
        variant='ghost'
        colorScheme='secondary'
        onPress={handleSignUpScreen}
        leftIcon={<Icon as={Feather} name='user-plus' size={6} />}
      >
        Criar conta
      </Button>

      <Button
        variant='ghost'
        colorScheme='secondary'
        onPress={handleForgotPassword}
        leftIcon={<Icon as={Feather} name='mail' size={6} />}
      >
        Esqueci minha senha
      </Button>
    </VStack>
  )
}
