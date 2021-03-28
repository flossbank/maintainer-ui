import React from 'react'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'

import CustomTheme from '../public/theme'
import { ProvideAuth } from '../utils/useAuth'

import '../styles/main.scss'

export default function Flossbank ({ Component, pageProps }) {
  return (
    <ThemeProvider theme={CustomTheme}>
      <CSSReset />
      <ColorModeProvider value='light'>
        <ProvideAuth>
          <Component {...pageProps} />
        </ProvideAuth>
      </ColorModeProvider>
    </ThemeProvider>
  )
}
