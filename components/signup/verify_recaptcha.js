import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { decode } from 'b36'
import Recaptcha from 'react-recaptcha'
import { Flex, Text } from '@chakra-ui/react'

import { useLocalStorage } from '../../utils/useLocalStorage'
import { localStorageGHStateKey } from '../../utils/constants'
import Section from '../common/section'
import UnderlinedHeading from '../common/underlinedHeading'
import BouncyLoader from '../common/bouncyLoader'
import Subheading from '../common/subheading'
import TextLink from '../common/textLink'
import ErrorMessage from '../common/errorMessage'
import { useAuth } from '../../utils/useAuth'

const VerifyHumanity = () => {
  const router = useRouter()
  const auth = useAuth()
  const [queryMiss, setQueryMiss] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('')
  const [hasError, setHasError] = useState(false)
  const showCaptcha = useMemo(() => email && token, [email, token])
  const [ghState, _] = useLocalStorage(localStorageGHStateKey, '') // eslint-disable-line

  const attemptPageDataLoad = async () => {
    setIsLoading(true)
    try {
      const { e: encodedEmail, token } = router.query || {}

      const noQueryParams = !window.location.search
      const invalidQueryParams = !(encodedEmail && token)

      if ((invalidQueryParams && queryMiss) || noQueryParams) {
        setHasError(true)
        setStatus('Failure: no email or token in URL. ')
      } else if (invalidQueryParams) {
        setQueryMiss(true)
      } else {
        setHasError(false)
        setStatus('Verifying email...')
        setEmail(decode(encodedEmail).toString())
        setToken(token)
      }
    } catch (e) {
      setHasError(true)
      setStatus('Failed to verify. ')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    attemptPageDataLoad()
  }, [router.query])

  const verify = async (response) => {
    try {
      await auth.verify({ email, token, response })
      setHasError(false)
      setStatus('Success!')
      router.push('/dashboard')
    } catch (e) {
      setHasError(true)
      setStatus('Failed to verify email. ')
    }
  }

  return (
    <>
      {isLoading && (
        <Flex flexDirection='column' paddingTop='20%' alignItems='center' height='80vh'>
          <BouncyLoader />
        </Flex>
      )}
      {!isLoading && (
        <>
          <Head>
            <script src='https://www.google.com/recaptcha/api.js' async defer />
          </Head>
          <h1 className='sr-only'>Verify your Flossbank account</h1>
          <Section
            textAlign='center'
            padding={{ base: '1.5rem 1.5rem 3rem', lg: '1rem 3rem 4rem' }}
            aria-live='polite'
          >
            <UnderlinedHeading text='Verify' align='center' aria-hidden='true' />
            <Subheading>No robots allowed</Subheading>
            <Text marginBottom='0.5rem'>
              On behalf of the Open Source community, thank you for signing up!
              &hearts;
            </Text>
            {!hasError && (
              <Text marginBottom='1.5rem'>
                {status}
              </Text>
            )}
            {showCaptcha && (
              <Flex direction='row' justify='center' marginTop='3rem' marginBottom='3rem'>
                <Recaptcha
                  render='explicit'
                  onloadCallback={() =>
                    setStatus("Please complete the captcha below to verify you're a human.")}
                  verifyCallback={verify}
                  sitekey={process.env.RECAPTCHA_SITE_KEY}
                />
              </Flex>
            )}
            {hasError && (
              <ErrorMessage
                msg={status}
                maxW='30rem'
                iconSize='2rem'
                margin='3rem auto 0'
                color='boulder'
                padding='1.5rem !important'
              >
                Please try again or contact{' '}
                <TextLink
                  text='support@flossbank.com'
                  external
                  href='mailto:support@flossbank.com'
                />{' '}
                for assistance.
              </ErrorMessage>
            )}
          </Section>
        </>
      )}
    </>
  )
}

export default VerifyHumanity
