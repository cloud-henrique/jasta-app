import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

interface InputProps extends IInputProps {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputProps) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} flex={1}>
      <NativeBaseInput
        h={14}
        maxH={14}
        minH={14}
        px={4}
        mr={1}
        isInvalid={invalid}
        rounded='lg'
        bg='gray.500'
        color='gray.100'
        fontSize='md'
        borderWidth={1}
        borderColor='gray.700'
        keyboardAppearance='dark'
        placeholderTextColor='gray.300'
        _invalid={{ borderWidth: 1, borderColor: 'red.500' }}
        _focus={{
          bg: 'gray.500',
          borderWidth: 1,
          borderColor: 'primary.700',
          cursorColor: 'gray.100',
          selectionColor: 'gray.100',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
