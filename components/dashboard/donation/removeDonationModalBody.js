import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Icon, Text, ModalFooter, ModalBody } from '@chakra-ui/core'

import FBButton from '../../common/fbButton'
import ErrorMessage from '../../common/errorMessage'

import { deleteDonation } from '../../../client'

const RemoveDonation = ({ updateDonorStatus, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const [error, setError] = useState('')

  const handleRemoveDonation = async () => {
    setIsDeleting(true)
    try {
      const organizationId = router.query.organizationId
      const response = await deleteDonation({ organizationId })
      if (response.success) {
        updateDonorStatus(false)
        onClose()
      } else {
        setError(
          'There was an error attemping to discontinue your support. Please try again.'
        )
      }
    } catch (e) {
      setError(
        'There was an error attemping to discontinue your support. Please try again.'
      )
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    updateDonorStatus(true)
  }

  return (
    <>
      <ModalBody marginBottom='1.5rem'>
        <Text marginBottom='1.5rem'>
          Discontinuing your monthly contribution will mean your badge will no longer be valid.
          Remember to remove it from any social media's or domains you may have placed it.
          You can become a monthly contributor again at any time.
        </Text>
        <Text marginBottom='1.5rem'>
          <strong>
            Are you sure you want to discontinue your monthly support?
          </strong>
        </Text>
      </ModalBody>
      {error && <ErrorMessage msg={error} marginBottom='3rem' />}
      <ModalFooter
        display='flex'
        alignItems='center'
        padding='0'
        justifyContent='center'
        marginBottom='3rem'
      >
        <FBButton
          onClick={handleCancel}
          className='u-box-shadow'
          fontWeight='600'
          backgroundColor='puddle'
          color='ocean'
          margin='0 1.5rem 0 0'
        >
          <Box as='span' display='flex' alignItems='center'>
            <Icon name='close' fontSize='1rem' marginRight='1rem' />
            Keep contributing
          </Box>
        </FBButton>
        <FBButton
          onClick={handleRemoveDonation}
          isLoading={isDeleting}
          loadingText='Submitting...'
          className='u-box-shadow'
          backgroundColor='#b9423a'
          color='#ffe5e5'
          fontWeight='600'
        >
          <Box as='span' display='flex' alignItems='center'>
            <Icon name='delete' fontSize='1rem' marginRight='1rem' />
            Discontinue contributing
          </Box>
        </FBButton>
      </ModalFooter>
    </>
  )
}

export default RemoveDonation
