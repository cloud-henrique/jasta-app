import { IButtonProps, Button as NativeBaseButton, Text } from 'native-base'
import { ReactNode } from 'react'

interface ButtonProps extends IButtonProps {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton px={4} h={14} bg='indigo.500' _pressed={{ bgColor: 'indigo.500' }} {...rest}>
      <Text fontWeight={600} textAlign='center' fontSize='md'>
        {children}
      </Text>
    </NativeBaseButton>
  )
}
