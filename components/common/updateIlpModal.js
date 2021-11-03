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
import { updateIlpPointer } from '../../client/index'
import TextLink from './textLink'

const UpdateILPModal = ({ isOpen, handleUpdateIlpPointer, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit } = useForm()

  async function updateILPLocal (values, e) {
    setError('')
    e.preventDefault()

    const { pointer } = values

    if (!pointer) {
      setError('Please enter a valid ILP Pointer')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await updateIlpPointer({ pointer })
      if (res.success) handleUpdateIlpPointer(pointer)
    } catch (e) {
      if (e.status === 400) {
        setError('Pointer must be min length of 3 characters')
      } else {
        setError('Something went wrong, please try again')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Interledger Pointer</ModalHeader>
        <ModalBody>
          <Text marginBottom='1rem'>
            An ILP Pointer is used so we can pay you in a discrete, transparent, and location agnostic way. Please add a payment
            pointer to start getting paid!
          </Text>
          <TextLink
            text='Click here to learn more about Interledger and ILP'
            target='_blank'
            href='/wallet-overview'
          /><br />
          <TextLink
            external
            text='Click here for where to find your ILP Pointer'
            href='https://support.uphold.com/hc/en-us/articles/360043227832-How-to-find-your-ILP-address-Interledger-payment-pointer-'
          />
          <Box
            as='form'
            marginTop='1rem'
            onSubmit={handleSubmit(updateILPLocal)}
          >
            {error && (
              <ErrorMessage msg={error} />
            )}
            <FBFormControl labelText='ILP Pointer' id='pointer' required>
              <FBTextInput
                autoFocus
                id='pointer'
                type='text'
                name='pointer'
                register={register({ required: true })}
                aria-describedby='pointer-error'
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

export default UpdateILPModal
