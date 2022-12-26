import { HStack, Text } from 'native-base'


export function SettingsHeader() {
  return (
    <HStack bgColor='gray.700' safeAreaTop p={3} alignItems='center' justifyContent='space-between'>
      <Text bold color='gray.100' fontSize='xl'>
        Configurações
      </Text>
    </HStack>
  )
}
