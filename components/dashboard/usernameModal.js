import {
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  Box,
  ModalHeader
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import FBFormControl from '../common/formControl'
import FBTextInput from '../common/fbTextInput'
import FBButton from '../common/fbButton'
import ErrorMessage from '../common/errorMessage'
import { updateUsername } from '../../client/index'

const UsernameModal = ({ isOpen, onClose, handleUpdateUsername, canCloseEasily }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit } = useForm()

  async function updateUsernameLocal (values, e) {
    setError('')
    e.preventDefault()

    const { username } = values

    if (!username || !/^[a-zA-Z0-9-]+$/.test(username)) {
      setError('Please enter an username with alphanumeric and hyphens only')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await updateUsername({ username })
      if (res.success) {
        if (handleUpdateUsername) handleUpdateUsername(username)
        else onClose()
      }
    } catch (e) {
      if (e.status === 400) {
        setError('Username must be max length 64 characters and alphanumeric with hyphens')
      } else if (e.status === 409) {
        setError('That username is already taken, please try another')
      } else {
        setError('Something went wrong, please try again')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={canCloseEasily} closeOnEsc={canCloseEasily}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add username</ModalHeader>
        <ModalBody>
          <Text marginBottom='1rem'>
            A username is to used for others to identify you without using your email. This is so we can keep your email private.
          </Text>
          <Box
            as='form'
            onSubmit={handleSubmit(updateUsernameLocal)}
          >
            {error && (
              <ErrorMessage msg={error} />
            )}
            <FBFormControl labelText='Username' id='username' required>
              <FBTextInput
                id='username'
                type='text'
                name='username'
                onChange={() => setError('')}
                register={register({ required: true })}
                aria-describedby='username-error'
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UsernameModal
