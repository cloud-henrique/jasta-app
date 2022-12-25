import { VStack } from 'native-base'

import { ProfileHeader } from '@components/Headers/ProfileHeader'

export function Profile() {
  return (
    <VStack flex={1} bgColor='gray.600'>
      <ProfileHeader />
    </VStack>
  )
}
