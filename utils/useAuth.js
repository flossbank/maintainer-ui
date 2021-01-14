import React, { useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { useLocalStorage } from './useLocalStorage'
import { authEndpoints } from './constants'
import * as api from '../client/index'

import { Flex, Text } from '@chakra-ui/core'

import BouncyLoader from '../components/common/bouncyLoader'

const authContext = createContext()

const Loader = () => (
  <Flex
    height='100vh'
    bg='rgba(255, 255, 255, .15)'
    color='boulder'
    direction='column'
    justify='center'
    align='center'
    aria-busy='true'
  >
    <Text fontSize='1.25rem' fontWeight='500' marginBottom='3rem'>
      Loading…
    </Text>
    <BouncyLoader />
  </Flex>
)

// Provider component that wraps your app and makes auth available
export function ProvideAuth ({ children }) {
  const router = useRouter()
  const [rcCaptured, setRcCaptured] = useState(false)
  const [cachedDest, setCachedDest] = useState(false)
  const auth = useProvideAuth()
  const [isUserAuthed, setIsUserAuthed] = useLocalStorage('flossbank_auth', false)
  const [_, setFlossbankDest] = useLocalStorage('flossbank_dest', '') // eslint-disable-line
  const [__, setUserReferrer] = useLocalStorage('flossbank_rc', '') // eslint-disable-line

  if (router.query.rc && !rcCaptured) {
    setRcCaptured(true)
    setUserReferrer(router.query.rc)
    router.replace(router.route)
  }

  // 1. user is visiting protected endpoint (e.g. Dashboard)
  // 2. user has no session in React state
  // 3. user has no auth flag in local storage
  // Result: they must not have a valid API cookie, so we will require them to login (and show the loader)
  if (router && authEndpoints.includes(router.pathname) && !auth.user && !isUserAuthed) {
    // Store the endpoint they attempted to navigate to
    if (!cachedDest) {
      setCachedDest(true)
      setFlossbankDest(router.pathname)
    }
    if (typeof window !== 'undefined') {
      router.push('/login')
    }
    return <Loader />
  }

  if (isUserAuthed && !auth.user) {
    auth.resume().catch((_) => {
      setIsUserAuthed(false)
    })
    return <Loader />
  }

  // User is either completely authed OR accessing a page that requires no authentication
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext)
}

// Provider hook that creates auth object and handles state
function useProvideAuth () {
  const [user, setUser] = useState(null)
  const [_, setAuthedFlag] = useLocalStorage('flossbank_auth', false) // eslint-disable-line
  const [userReferrer, __] = useLocalStorage('flossbank_rc', '') // eslint-disable-line

  const setSessionUser = (u) => {
    setUser(u || null)
    setAuthedFlag(!!u)
  }

  const login = async (body) => {
    const res = await api.login(body)
    return res
  }

  const completeLogin = async (body) => {
    const res = await api.completeLogin(body)
    setSessionUser(res.success && res.user)
    return res
  }

  const completeGHLogin = async ({ state, code }) => {
    const res = await api.completeGHLogin({ state, code })
    setSessionUser(res.success && res.user)
    return res
  }

  const logout = async () => {
    await api.logout()
    setSessionUser(undefined)
  }

  const signup = async (body) => {
    if (userReferrer && userReferrer !== '') {
      body.referralCode = userReferrer
    }
    const res = await api.signup(body)
    return res
  }

  const resume = async () => {
    const res = await api.resume()
    setSessionUser(res.success && res.user)
  }

  const verify = async (opts) => {
    const res = await api.verifyRegistration(opts)
    setSessionUser(res.success && res.user)
  }

  return {
    resume,
    signup,
    login,
    verify,
    completeLogin,
    completeGHLogin,
    user,
    logout
  }
}
