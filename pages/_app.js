import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import CustomTheme from '../public/theme'
import { ProvideAuth } from '../utils/useAuth'

import '../styles/main.scss'

export default function Flossbank ({ Component, pageProps }) {
  return (
    <ChakraProvider theme={CustomTheme}>
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  )
}
