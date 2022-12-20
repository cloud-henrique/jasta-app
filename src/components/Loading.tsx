import { Center, ISpinnerProps, Spinner } from 'native-base'

interface LoadingProps extends ISpinnerProps {}

export function Loading({ ...rest }: LoadingProps) {
  return (
    <Center flex={1} bg='gray.700'>
      <Spinner color='primary.500' {...rest} />
    </Center>
  )
}
