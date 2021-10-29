import {
  Box,
  Text,
  Select,
  Textarea,
  Alert,
  AlertIcon
} from '@chakra-ui/react'

import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import FBButton from '../common/fbButton'
import TextLink from '../common/textLink'
import ErrorMessage from '../common/errorMessage'

import { sendSupportFeedback } from '../../client'
import FBTextInput from '../common/fbTextInput'
import FBFormControl from '../common/formControl'

const topics = [
  'Partnerships',
  'Feedback',
  'Unsolicited praise',
  'Bug',
  'Other'
]

const ContactForm = ({ contactFormSubmitted }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState('')

  const { register, handleSubmit, errors } = useForm()

  const formValid = ({ name, email, topic, body }) => {
    if (name.length > 128) {
      setFormError('Name cannot be longer than 128 characters')
      return false
    }
    if (email.length > 128) {
      setFormError('Email cannot be longer than 128 characters')
      return false
    }
    if (topic.length > 128) {
      setFormError('Topic cannot be longer than 128 characters')
      return false
    }
    if (body.length > 1024) {
      setFormError('Message cannot be longer than 1024 characters')
      return false
    }
    return true
  }

  const submit = async (values, e) => {
    e.preventDefault()

    const { name, email, topic, body } = values

    if (!formValid({ name, email, topic, body })) return

    setIsSubmitting(true)

    try {
      await sendSupportFeedback({ name, email, topic, body })
      setFormError('')
      setSent(true)
      contactFormSubmitted()
    } catch (e) {
      setFormError('There was an error submitting the form. Please try again!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box aria-atomic='true'>
      {sent && !formError && (
        <Alert
          status='success'
          backgroundColor='puddle'
          color='ocean'
          fontWeight='500'
          marginBottom='1.5rem'
        >
          <AlertIcon color='ocean' />
          Your message was successfully sent! We'll get back to you soon.
        </Alert>
      )}
      {!sent && (
        <Box
          as='form'
          textAlign='left'
          color='boulder'
          textTransform='none'
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          {formError && (
            <ErrorMessage msg={formError} />
          )}
          <FBFormControl labelText='Your name' id='your-name' required>
            <Box id='name-error' aria-atomic='true'>
              {errors.name && (
                <ErrorMessage msg="Don't forget to tell us your name!" />
              )}
            </Box>
            <FBTextInput
              id='your-name'
              type='text'
              name='name'
              register={register({ required: true })}
              aria-describedby='name-error'
            />
          </FBFormControl>
          <FBFormControl labelText='Email address' id='email' required>
            <Box id='email-error' aria-atomic='true'>
              {errors.email && (
                <ErrorMessage msg='Please enter a valid email address' />
              )}
            </Box>
            <FBTextInput
              id='email'
              type='email'
              name='email'
              aria-describedby='email-error'
              register={register({
                required: true,
                pattern: {
                  value: /^\S+@\S+$/i
                }
              })}
            />
          </FBFormControl>
          <FBFormControl labelText='Topic' id='topic' required>
            <Box id='topic-error' aria-atomic='true'>
              {errors.topic && (
                <ErrorMessage msg='Please select a topic that pertains to your message' />
              )}
            </Box>
            <Select
              id='topic'
              placeholder='What is this about?'
              variant='filled'
              backgroundColor='lightRock'
              color='boulder'
              name='topic'
              aria-describedby='topic-error'
              _hover={{
                backgroundColor: '#f2f2f2'
              }}
              ref={register({ required: true })}
            >
              {topics.map((topic, i) => (
                <option value={topic} name={topic} key={i}>
                  {topic}
                </option>
              ))}
            </Select>
          </FBFormControl>
          <FBFormControl labelText='How can we help?' id='message' required>
            <Box id='message-error' aria-atomic='true'>
              {errors.body && (
                <ErrorMessage msg="Don't forget to enter your message. We'd love to hear from you!" />
              )}
            </Box>
            <Textarea
              id='message'
              name='body'
              backgroundColor='lightRock'
              borderRadius='10px'
              resize='none'
              height='8rem'
              aria-describedby='topic-error'
              ref={register({ required: true })}
            />
          </FBFormControl>

          <Box marginTop='2rem'>
            <FBButton
              isLoading={isSubmitting}
              loadingText='Submitting...'
              type='submit'
              className='u-box-shadow'
              margin='0 0 1.5rem'
            >
              Submit
            </FBButton>
          </Box>
        </Box>
      )}
      <Text>
        You can also email us directly at{' '}
        <TextLink
          text='support@flossbank.com'
          external
          href='mailto:support@flossbank.com'
        />
        .
      </Text>
    </Box>
  )
}

ContactForm.propTypes = {
  contactFormSubmitted: PropTypes.func.isRequired
}

export default ContactForm
