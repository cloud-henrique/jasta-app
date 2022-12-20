import { Text, VStack } from 'native-base'

export function Notes() {
  return (
    <VStack flex={1} bgColor='gray.600' alignItems='center' justifyContent='center'>
      <Text bold color='gray.100' fontSize='3xl'>
        Minhas Notas
      </Text>
    </VStack>
  )
}
