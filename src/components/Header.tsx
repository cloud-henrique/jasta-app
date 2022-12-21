import { Center } from 'native-base'

import LogoSvg from '@assets/images/logo.svg'

export function Header() {
  return (
    <Center bg='gray.700' h={40} px={6}>
      <LogoSvg />
    </Center>
  )
}
