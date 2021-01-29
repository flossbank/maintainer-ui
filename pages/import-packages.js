import { useState } from 'react'

import {
  Alert,
  AlertIcon,
  Box
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'

import { proveNpmOwnership } from '../client/index'

import UnderlinedHeading from '../components/common/underlinedHeading'
import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import FBFormControl from '../components/common/formControl'
import FBTextInput from '../components/common/fbTextInput'
import FBButton from '../components/common/fbButton'
import ErrorMessage from '../components/common/errorMessage'
import Card from '../components/common/card'

const ImportPackages = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit } = useForm()

  async function fetchOwnedPackages (values, e) {
    setError('')
    e.preventDefault()
    setIsSubmitting(true)

    const { npmToken } = values

    try {
      const res = await proveNpmOwnership({ token: npmToken })
      console.log('here', res)
    } catch (e) {
      setError('There was an issue validating your npm token, please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageWrapper title='Import packages'>
      <Section
        justifyItems='center'
        flexDirection='column'
        alignItems='center'
        padding={{ base: '3rem 1.5rem', lg: '6rem 7.5rem' }}
        backgroundColor='white'
        height='90vh'
        justifyContent='center'
      >
        <UnderlinedHeading
          text='Import packages'
          align={{ base: 'center', lg: 'center' }}
          marginBottom='2rem'
        />
        <Card shadowSz='lg' w='100%' maxW='60rem' margin='auto'>
          <Alert
            status='info'
            backgroundColor='puddle'
            color='ocean'
            fontWeight='500'
            marginBottom='1.5rem'
          >
            <AlertIcon color='ocean' />
            Paste in an NPM READ ONLY token (we do not store this token) to allow us to get a list of allow
            owned packages.
          </Alert>
          <Box
            as='form'
            onSubmit={handleSubmit(fetchOwnedPackages)}
          >
            {error && (
              <ErrorMessage msg={error} />
            )}
            <FBFormControl labelText='NPM Token' id='npm-token' required>
              <FBTextInput
                id='npm-token'
                type='text'
                name='npmToken'
                register={register({ required: true })}
                aria-describedby='npm-token-error'
              />
            </FBFormControl>
            <Box marginTop='2rem'>
              <FBButton
                isLoading={isSubmitting}
                loadingText='Importing...'
                type='submit'
                className='u-box-shadow'
                margin='0 0 1.5rem'
              >
                Import
              </FBButton>
            </Box>
          </Box>
        </Card>
      </Section>
    </PageWrapper>
  )
}

export default ImportPackages
