import { useState } from 'react'

import {
  Box,
  Flex,
  Text,
  Icon,
  Input,
  Heading,
  FormControl,
  FormLabel
} from '@chakra-ui/core'

import { useForm } from 'react-hook-form'

import PropTypes from 'prop-types'

import Section from './section'
import Card from './card'
import FBButton from './fbButton'
import TextLink from './textLink'
import ErrorMessage from './errorMessage'
import GitHubLoginButton from './githubButton'

import styles from './authProcess.module.scss'

const AuthProcess = ({
  process,
  icon,
  subHeadingText,
  login,
  headingText,
  submitText,
  successText,
  btnLoadingText,
  otherProcessLinkText,
  otherProcessText,
  otherProcessHref,
  subSuccessText
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [formError, setFormError] = useState('')

  const { register, handleSubmit, errors } = useForm()

  const handleProcess = async (args, e) => {
    const { email } = args
    e.preventDefault()
    setEmail(email)
    setIsSubmitting(true)

    try {
      // Will pass login or signup from client
      const res = await process({ email })
      if (res.success && res.code) {
        setConfirmationCode(res.code)
      }
      setSent(true)
      setFormError('')
    } catch (e) {
      switch (e.status) {
        case 404:
          setFormError(
            "The email you entered doesn't match our records. Please try again or try signing up"
          )
          break
        case 409:
          setFormError("Looks like you're already signed up! Try logging in.")
          break
        default:
          setFormError(
            'There was an error submitting the form. Please try again!'
          )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section
      backgroundColor='lightRock'
      minHeight={{ lg: '75vh' }}
      display='flex'
      alignItems='center'
      justifyContent='center'
      flex='1'
      flexDirection='column'
      paddingBottom={{ lg: '6rem !important' }}
    >
      <Heading
        as='h1'
        className={sent && !formError ? 'sr-only' : ''}
        fontSize='1.5rem'
        fontWeight='400'
        marginBottom='3rem'
      >
        {headingText}
      </Heading>
      {subHeadingText && (
        <Text maxWidth='40rem' textAlign='center' marginBottom='2rem'>{subHeadingText}</Text>
      )}
      {!sent && (
        <>
          <Box
            width='100%'
            maxWidth='30rem'
            marginBottom='2rem'
          >
            <GitHubLoginButton
              text={submitText}
              login={login}
            />
          </Box>
          <Card
            marginBottom='3rem'
            width='100%'
            maxW='30rem'
            aria-atomic='true'
          >
            <Box as='form' onSubmit={handleSubmit(handleProcess)} noValidate>
              {formError && <ErrorMessage msg={formError} />}
              <FormControl marginBottom='1.5rem' isRequired>
                <FormLabel htmlFor='email' marginBottom='.5rem' className={styles.label}>
                  Email address
                </FormLabel>
                <Box aria-atomic='true' id='email-error'>
                  {errors.email && (
                    <ErrorMessage msg='Please provide a valid email address' />
                  )}
                </Box>
                <Input
                  type='email'
                  id='email'
                  backgroundColor='lightRock'
                  name='email'
                  autoComplete='email'
                  aria-describedby='email-error'
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^\S+@\S+$/i
                    }
                  })}
                />
              </FormControl>
              <FormControl marginBottom='2.25rem' isRequired>
                <FormLabel htmlFor='privacy' marginBottom='.5rem' className={styles.label}>
                    Consent to privacy policy
                </FormLabel>
                <Box aria-atomic='true' id='privacy-error'>
                  {errors.privacy && (
                    <ErrorMessage msg="Please check the box that to verify that you've read our privacy policy" />
                  )}
                </Box>
                <input
                  type='checkbox'
                  id='privacy'
                  name='privacy'
                  aria-describedby='privacy-error'
                  ref={register({
                    required: true
                  })}
                />
                <Text display='inline' marginLeft='1rem'>I've read the <TextLink href='/privacy' text='privacy policy' /> and consent</Text>
              </FormControl>
              <FBButton
                isLoading={isSubmitting}
                loadingText={btnLoadingText}
                type='submit'
              >
                {submitText}
              </FBButton>
            </Box>
          </Card>
          <Box
            width='100%'
            maxW='30rem'
            textAlign='center'
          >
            <Text>
              {otherProcessText} <TextLink href={otherProcessHref} text={otherProcessLinkText} />
            </Text>
          </Box>
        </>
      )}
      {sent && !formError && (
        <Flex
          direction='column'
          align='center'
          justify='space-between'
          aria-live='polite'
        >
          <Icon name={icon} size='6rem' marginBottom='1.5rem' />
          <Heading
            as='h1'
            fontSize='2rem'
            fontWeight='400'
            marginBottom='1.5rem'
          >
            {successText}
          </Heading>
          <Text marginBottom='1.5rem'>{subSuccessText}</Text>
          {confirmationCode && (
            <>
              <Text>
                We just sent an email to <b>{email}</b>
              </Text>
              <Text marginBottom='1.5rem'>
                Verify that the provided security code matches the following text:
              </Text>
              <Text fontWeight='bold'>{confirmationCode}</Text>
            </>
          )}
        </Flex>
      )}
    </Section>
  )
}

AuthProcess.propTypes = {
  // pass login or sign up from client
  process: PropTypes.func.isRequired,
  login: PropTypes.bool.isRequired,
  // text for the submit button
  submitText: PropTypes.string.isRequired,
  subHeadingText: PropTypes.string,
  // message to show if process was successful
  successText: PropTypes.string.isRequired,
  // sub message to show if process was successful
  subSuccessText: PropTypes.string.isRequired,
  // text to go below the form
  otherProcessText: PropTypes.string.isRequired,
  otherProcessHref: PropTypes.string.isRequired,
  otherProcessLinkText: PropTypes.string.isRequired
}
export default AuthProcess
