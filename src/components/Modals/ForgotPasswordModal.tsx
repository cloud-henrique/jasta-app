import { useState } from 'react'

import { Button, Input, Modal, Text } from 'native-base'
import { InterfaceModalProps } from 'native-base/lib/typescript/components/composites/Modal/types'

interface ForgotModalProps extends InterfaceModalProps {
  onSubmit: (email: string) => void
}

export function ForgotPasswordModal({ onSubmit, ...rest }: ForgotModalProps) {
  const [email, setEmail] = useState('')

  return (
    <Modal animationPreset='slide' {...rest}>
      <Modal.Content w='full'>
        <Modal.CloseButton />

        <Modal.Header>Insira aqui o seu e-mail</Modal.Header>

        <Modal.Body>
          <Text mb={4}>Enviaremos um link para redefinir sua senha</Text>

          <Input
            bg='gray.600'
            borderColor='gray.400'
            onChangeText={setEmail}
            placeholder='E-mail'
            keyboardType='email-address'
          />
        </Modal.Body>

        <Modal.Footer>
          <Button w='full' size='md' onPress={() => onSubmit(email)}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
