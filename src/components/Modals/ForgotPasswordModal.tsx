import { Actionsheet, Text } from 'native-base'
import { InterfaceActionsheetProps } from 'native-base/lib/typescript/components/composites/Actionsheet/types'

interface ForgotModalProps extends InterfaceActionsheetProps {}

export function ForgotPasswordModal({ isOpen, onClose, ...rest }: ForgotModalProps) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} {...rest}>
      <Actionsheet.Content>
        <Text>Insira aqui o seu e-mail</Text>
        <Actionsheet.Item>Cláudio</Actionsheet.Item>
        <Actionsheet.Item>Henrique</Actionsheet.Item>
        <Actionsheet.Item>Oliveira</Actionsheet.Item>
        <Actionsheet.Item>Andrade</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  )
}
