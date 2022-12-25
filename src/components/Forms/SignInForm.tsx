import { useState } from 'react'

import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Button as NBButton, Icon, Text, useToast, VStack } from 'native-base'
import { MaterialCommunityIcons as MCIcon, Feather } from '@expo/vector-icons'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Alert } from 'react-native'

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

      <Button mt={5} mb={6} isLoading={isLoading} onPress={handleSignIn}>
        Entrar
      </Button>

      <NBButton
        variant='unstyled'
        onPress={handleSignUpScreen}
        leftIcon={<Icon as={Feather} name='user-plus' color='secondary.500' size={6} />}
      >
        <Text color='secondary.500' bold>
          Criar conta
        </Text>
      </NBButton>

      <NBButton
        variant='unstyled'
        onPress={handleForgotPassword}
        leftIcon={<Icon as={Feather} name='mail' color='secondary.500' size={6} />}
      >
        <Text color='secondary.500' bold>
          Esqueci minha senha
        </Text>
      </NBButton>
    </VStack>
  )
}
