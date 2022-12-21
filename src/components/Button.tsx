import { IButtonProps, Button as NativeBaseButton, Text } from 'native-base'
import { ReactNode } from 'react'

interface ButtonProps extends IButtonProps {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton px={4} h={14} bg='primary.700' _pressed={{ bgColor: 'primary.500' }} {...rest}>
      <Text color='gray.200' fontWeight={600} textAlign='center' fontSize='md'>
        {children}
      </Text>
    </NativeBaseButton>
  )
}
