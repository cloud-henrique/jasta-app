import { Text, VStack } from 'native-base'

export function SignIn() {
  return (
    <VStack bgColor='gray.700' flex={1} alignItems='center' justifyContent='center'>
      <Text color='gray.200' fontSize='2xl' bold>Entrar com Google (firebase)</Text>
    </VStack>
  )
}
