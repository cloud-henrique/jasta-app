import { Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('screen')

export default {
  sizing: {
    12: `${RFValue(12, height)}px`,
    14: `${RFValue(14, height)}px`,
    16: `${RFValue(16, height)}px`,
    18: `${RFValue(18, height)}px`,
    20: `${RFValue(20, height)}px`,
    24: `${RFValue(24, height)}px`,
    32: `${RFValue(32, height)}px`,
    40: `${RFValue(40, height)}px`,
  },
  fonts: {
    100: 'Inter-100',
    200: 'Inter-200',
    300: 'Inter-300',
    400: 'Inter-400',
    500: 'Inter-500',
    600: 'Inter-600',
    700: 'Inter-700',
    800: 'Inter-800',
    900: 'Inter-900',
  },
}
