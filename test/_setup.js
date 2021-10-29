/* global jest */
import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import CustomTheme from '../public/theme'
import '@testing-library/jest-dom/extend-expect'

const AllTheProviders = ({ children }) => {
  return (
    <ChakraProvider theme={CustomTheme}>
      {children}
    </ChakraProvider>
  )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
export function mockNextUseRouter ({ route, pathname, query, asPath }) {
  const router = {
    route,
    pathname,
    query,
    asPath,
    push: jest.fn()
  }
  useRouter.mockImplementation(() => router)
  return router
}
