import { Keyboard, TouchableWithoutFeedback } from 'react-native'

import { Image, KeyboardAvoidingView, Text } from 'native-base'

import signInImg from '@assets/images/sign-in.png'
import { SignInForm } from '@components/Forms/SignInForm'

export function SignIn() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView flex={1} bgColor='gray.700' px={5} pt={24}>
        <Image alt='Sign up illustration' source={signInImg} width={200} height={200} alignSelf='center' />

        <Text color='gray.200' fontSize='2xl' bold mt={5}>
          Entre com sua conta
        </Text>

        <SignInForm />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
