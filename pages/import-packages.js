import { useState } from 'react'

import {
  Alert,
  AlertIcon,
  Box
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'

import {
  proveNpmOwnership,
  proveRubygemsOwnership
} from '../client/index'

import UnderlinedHeading from '../components/common/underlinedHeading'
import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import FBFormControl from '../components/common/formControl'
import FBTextInput from '../components/common/fbTextInput'
import FBButton from '../components/common/fbButton'
import ErrorMessage from '../components/common/errorMessage'
import Card from '../components/common/card'

const ImportPackages = () => {
  const [isNpmSubmitting, setIsNpmSubmitting] = useState(false)
  const [isRubygemsSubmitting, setIsRubygemsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit } = useForm()

  async function fetchOwnedPackages (values, e) {
    setError('')
    e.preventDefault()

    const { npmToken, rubygemsToken, rubygemsUsername } = values

    try {
      if (npmToken) {
        setIsNpmSubmitting(true)
        await proveNpmOwnership({ token: npmToken })
      }
      if (rubygemsToken) {
        setIsRubygemsSubmitting(true)
        await proveRubygemsOwnership({ token: rubygemsToken, username: rubygemsUsername })
      }
    } catch (e) {
      setError('There was an issue validating your tokens, please try again')
    } finally {
      setIsNpmSubmitting(false)
      setIsRubygemsSubmitting(false)
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
        minHeight='90vh'
        justifyContent='center'
      >
        <UnderlinedHeading
          text='Import packages'
          align={{ base: 'center', lg: 'center' }}
          marginBottom='2rem'
        />
        <Card shadowSz='lg' w='100%' maxW='60rem' margin='auto'>
          <Box
            as='form'
            onSubmit={handleSubmit(fetchOwnedPackages)}
          >
            {error && (
              <ErrorMessage msg={error} />
            )}
            <UnderlinedHeading>NPM</UnderlinedHeading>
            <Alert
              status='info'
              backgroundColor='puddle'
              color='ocean'
              fontWeight='500'
              marginBottom='1.5rem'
            >
              <AlertIcon color='ocean' />
              Paste in a NPM READ-ONLY token
              to allow us to get a list of your owned packages.
              <br />** We do not store this token
            </Alert>
            <FBFormControl labelText='NPM Readonly Token' id='npm-token'>
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
                isLoading={isNpmSubmitting}
                loadingText='Importing...'
                type='submit'
                className='u-box-shadow'
                margin='0 0 1.5rem'
              >
                Import NPM Packages
              </FBButton>
            </Box>
          </Box>
          <Box
            as='form'
            onSubmit={handleSubmit(fetchOwnedPackages)}
          >
            <UnderlinedHeading>RubyGems</UnderlinedHeading>
            <Alert
              status='info'
              backgroundColor='puddle'
              color='ocean'
              fontWeight='500'
              marginBottom='1.5rem'
            >
              <AlertIcon color='ocean' />
              Paste in an "Index Rubygems" scoped RubyGems API Key to allow us to get a list of your owned packages.
              <br />** We do not store this token
            </Alert>
            <FBFormControl labelText='RubyGems "Index rubygems" API Key' id='rubygems-token'>
              <FBTextInput
                id='rubygems-token'
                type='text'
                name='rubygemsToken'
                register={register({ required: true })}
                aria-describedby='rubygems-token-error'
              />
            </FBFormControl>
            <FBFormControl labelText='RubyGems Username' id='rubygems-username'>
              <FBTextInput
                id='rubygems-username'
                type='text'
                name='rubygemsUsername'
                register={register({ required: true })}
                aria-describedby='rubygems-username-error'
              />
            </FBFormControl>
            <Box marginTop='2rem'>
              <FBButton
                isLoading={isRubygemsSubmitting}
                loadingText='Importing...'
                type='submit'
                className='u-box-shadow'
                margin='0 0 1.5rem'
              >
                Import RubyGems Packages
              </FBButton>
            </Box>
          </Box>
        </Card>
      </Section>
    </PageWrapper>
  )
}

export default ImportPackages
