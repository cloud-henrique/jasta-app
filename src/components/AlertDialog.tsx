import { useRef } from 'react'

import { AlertDialog as Dialog, Button, Text } from 'native-base'
import { InterfaceAlertDialogProps } from 'native-base/lib/typescript/components/composites/AlertDialog/types'

interface AlertDialogProps extends InterfaceAlertDialogProps {
  colorScheme:
    | 'danger'
    | 'error'
    | 'success'
    | 'warning'
    | 'muted'
    | 'primary'
    | 'info'
    | 'secondary'
    | 'light'
    | 'tertiary'
  text: {
    title: string
    content: string
    cancel: string
    confirm: string
  }
  onConfirm: () => void
  isLoading?: boolean
}

export function AlertDialog({ text, colorScheme, onConfirm, onClose, leastDestructiveRef, isLoading, ...rest }: AlertDialogProps) {
  const ref = useRef(null)

  return (
    <Dialog leastDestructiveRef={ref} onClose={onClose} {...rest}>
      <Dialog.Content>
        <Dialog.CloseButton />
        <Dialog.Header bgColor='gray.500' borderColor='transparent'>
          <Text color='gray.200' bold fontSize='md'>
            {text.title}
          </Text>
        </Dialog.Header>
        <Dialog.Body bgColor='gray.500'>
          <Text color='gray.200'>{text.content}</Text>
        </Dialog.Body>
        <Dialog.Footer bgColor='gray.500' borderColor='transparent'>
          <Button.Group space={2}>
            <Button variant='unstyled' onPress={onClose}>
              <Text color='gray.200'>{text.cancel}</Text>
            </Button>
            <Button colorScheme={colorScheme} onPress={onConfirm} ref={ref} isLoading={isLoading}>
              <Text color='gray.200' fontWeight={600}>
                {text.confirm}
              </Text>
            </Button>
          </Button.Group>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
