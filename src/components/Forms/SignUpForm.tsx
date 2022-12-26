import { useState } from 'react'
import { Alert } from 'react-native'

import { Button, VStack } from 'native-base'
import auth from '@react-native-firebase/auth'

import { Input } from '@components/Input'

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleSignUp() {
    setIsLoading(true)

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Tudo certo!', 'Sua conta foi criada com sucesso 😁'))
      .catch(error => console.error(error))
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
        onSubmitEditing={handleSignUp}
      />

      <Button size='lg' mt={5} mb={6} isLoading={isLoading} onPress={handleSignUp}>
        Criar conta
      </Button>
    </VStack>
  )
}
