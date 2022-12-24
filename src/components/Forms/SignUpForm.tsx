import { VStack } from 'native-base'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useState } from 'react'

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleSignUp() {
    
  }

  return (
    <VStack>
      <Input mt={3} autoCapitalize='none' placeholder='E-mail' onChangeText={setEmail} keyboardType='email-address' />
      <Input mt={3} autoCapitalize='none' placeholder='Senha' onChangeText={setPassword} secureTextEntry />
      <Input
        mt={3}
        autoCapitalize='none'
        placeholder='Confirme a senha'
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />

      <Button mt={5} mb={6} isLoading={isLoading}>
        Criar conta
      </Button>
    </VStack>
  )
}
