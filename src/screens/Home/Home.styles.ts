import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BACKGROUND};
  flex: 1;
  justify-content: center;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.TEXT};
  font-family: ${({ theme }) => theme.fonts[700]};
  font-size: ${({ theme }) => theme.sizing[32]};
  text-align: center;
`
