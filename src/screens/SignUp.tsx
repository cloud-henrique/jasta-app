import { Keyboard, TouchableWithoutFeedback } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Button, Icon, Image, KeyboardAvoidingView, Text } from 'native-base'

import signUpImg from '@assets/images/sign-up.png'

import { SignUpForm } from '@components/Forms/SignUpForm'

export function SignUp() {
  const navigation = useNavigation()

  function handleSignInScreen() {
    navigation.navigate('SignIn')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView flex={1} bgColor='gray.700' px={5} pt={24}>
        <Image alt='Sign up illustration' source={signUpImg} width={200} height={200} alignSelf='center' />

        <Text color='gray.200' fontSize='2xl' bold mt={5}>
          Crie uma nova conta
        </Text>

        <SignUpForm />

        <Button
          variant='unstyled'
          onPress={handleSignInScreen}
          leftIcon={<Icon as={Feather} name='user-check' color='secondary.500' size={6} />}
        >
          <Text color='secondary.500' bold>
            Eu já tenho uma conta
          </Text>
        </Button>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
