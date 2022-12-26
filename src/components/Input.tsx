import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

interface InputProps extends IInputProps {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputProps) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} {...rest}>
      <NativeBaseInput {...rest} />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
