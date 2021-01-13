import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { decode } from 'b36'
import { Heading, Text } from '@chakra-ui/core'

import { useLocalStorage } from '../utils/useLocalStorage'
import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import BouncyLoader from '../components/common/bouncyLoader'

import { localStorageGHStateKey } from '../utils/constants'
import { useAuth } from '../utils/useAuth'

const CompleteLoginPage = () => {
  const router = useRouter()
  const auth = useAuth()
  const [status, setStatus] = useState('Logging in…')
  const [isLoading, setIsLoading] = useState(false)
  const [subHeader, setSubHeader] = useState('')
  const [loginAttempted, setLoginAttempted] = useState(false)
  const [flossbankDest, setFlossbankDest] = useLocalStorage('flossbank_dest', '')
  const [ghState, _] = useLocalStorage(localStorageGHStateKey, '') // eslint-disable-line

  function showError () {
    setIsLoading(false)
    setStatus('Authentication Failed')
    setSubHeader(`It looks like you may have clicked on an invalid email verification link. 
    Please close this window and try authenticating again.`)
  }

  async function attemptCompleteLogin () {
    setIsLoading(true)
    try {
      const { e: encodedEmail, token, code, state } = router.query

      if ((!encodedEmail || !token) && (!code || !state)) return

      if (loginAttempted) {
        showError()
        return
      }

      setLoginAttempted(true)

      // If code and state are passed in, then it as a GH auth redirect
      // Before processing GH redirect, we need to make sure the state we passed in
      // is the state returned
      if (code && state && (state === ghState)) {
        await auth.completeGHLogin({ code, state })
      } else if (encodedEmail && token) {
        const email = decode(encodedEmail || '').toString()
        await auth.completeLogin({ email, token })
      } else {
        showError()
        return
      }

      setTimeout(() => {
        // Set cached dest no matter what and redirect to one if it existed
        const flossbankDestTemp = flossbankDest
        setFlossbankDest('')
        if (flossbankDest) router.push(flossbankDestTemp)
        else router.push('/dashboard')
      }, 1000)
    } catch (e) {
      showError()
      setIsLoading(false)
    }
  }

  useEffect(() => {
    attemptCompleteLogin()
  }, [router.query]) // only run on mount

  return (
    <PageWrapper title='Log In'>
      <Section
        backgroundColor='lightRock'
        minHeight='85vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flex='1'
        flexDirection='column'
        paddingBottom={{ lg: '6rem !important' }}
        aria-live='polite'
        aria-atomic='true'
        aria-busy={isLoading}
      >
        <Heading marginBottom='3rem' color='boulder' fontWeight='400'>
          {status}
        </Heading>
        {isLoading && <BouncyLoader />}
        {subHeader && <Text>{subHeader}</Text>}
      </Section>
    </PageWrapper>
  )
}

export default CompleteLoginPage
