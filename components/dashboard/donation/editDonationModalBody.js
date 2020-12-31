import { useState } from 'react'
import { useRouter } from 'next/router'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

import { updateDonation, donate } from '../../../client'

import {
  Box,
  Icon,
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  ModalFooter,
  ModalBody
} from '@chakra-ui/core'

import BillingForm from '../billingForm'
import RemoveDonation from './removeDonationModalBody'

import FBButton from '../../common/fbButton'
import ErrorMessage from '../../common/errorMessage'

import styles from '../billingForm.module.scss'

const EditDonationModalBody = ({ donationAmount, isNewDonor, onClose }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [amountError, setAmountError] = useState('')
  const [newAmount, setNewAmount] = useState(donationAmount || 100)
  const [donorStatus, setDonorStatus] = useState(true); // eslint-disable-line
  const [updatingDonorStatus, setUpdatingDonorStatus] = useState(false)
  const router = useRouter()

  const stripe = useStripe()
  const elements = useElements()

  const handleNewAmount = (amount) => {
    if (amount < 10) {
      setAmountError('Donation must be at least $10')
      return
    }

    setAmountError('')
    setNewAmount(amount)
  }

  const handleDonorStatus = (status) => {
    setDonorStatus(status)
    setUpdatingDonorStatus(false)
  }

  const createDonation = async () => {
    // prevent quick button flash from isLoading event when there is a known error with the card
    if (submitError) {
      return
    }

    const cardElement = elements.getElement(CardElement)
    const res = await stripe.createToken(cardElement)
    const token = res.token

    if (!token) {
      throw new Error('Invalid credit card information')
    }

    try {
      const { organizationId } = router.query
      const response = await donate({
        organizationId,
        billingToken: token.id,
        amount: newAmount * 100,
        last4: token.card.last4
      })
      if (!response.success) {
        throw new Error('Donation failed')
      }
    } catch (e) {
      switch (e.status) {
        case 409:
          return updateDonationLocal()
        case 401:
          throw new Error('Looks like you aren\'t an organization Admin according to GitHub. You must be an admin of this organization to edit it\'s monthly contribution')
        default:
          throw new Error('Donation failed')
      }
    }
  }

  const updateDonationLocal = async () => {
    const { organizationId } = router.query
    await updateDonation({
      amount: newAmount * 100,
      organizationId,
      globalDonation: false
    })
  }

  const validateForm = () => {
    if (newAmount < 5) {
      return false
    }
    return true
  }

  const handleSaveChanges = async () => {
    const valid = validateForm()
    if (!valid) return
    setSubmitLoading(true)
    setSubmitError('')
    try {
      if (isNewDonor) {
        await createDonation()
      } else {
        await updateDonationLocal()
      }
      onClose()
    } catch (e) {
      setSubmitError(e.message || 'An error occurred updating your donation')
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <Box>
      {updatingDonorStatus && (
        <RemoveDonation
          updateDonorStatus={handleDonorStatus}
          onClose={onClose}
        />
      )}
      {donorStatus && !updatingDonorStatus && (
        <>
          <ModalBody marginBottom='1.5rem'>
            {!isNewDonor && (
              <>
                <Heading
                  as='h3'
                  fontSize='1rem'
                  fontWeight='500'
                  marginBottom='.5rem'
                  id='current-amt-modal'
                >
                  Current monthly contribution
                </Heading>
                <Text
                  color='ocean'
                  letterSpacing='2px'
                  fontSize='2rem'
                  marginBottom='1.5rem'
                >
                  ${donationAmount}
                </Text>
              </>
            )}
            <Box as='form' onSubmit={handleSaveChanges} margin='0 auto'>
              <Box
                as='label'
                textAlign='left'
                display='block'
                fontWeight='500'
                color='boulder'
                marginBottom='1.5rem'
              >
                Set new monthly contribution amount (<em>$10 USD minimum</em>)
                <Box
                  display='flex'
                  alignItems='center'
                  marginTop='.75rem'
                  maxWidth='6rem'
                  border='1px solid'
                  borderRadius='5px'
                  backgroundColor='white'
                >
                  <Box
                    as='span'
                    aria-hidden='true'
                    padding='.5rem'
                    fontWeight='bold'
                    backgroundColor='lightRock'
                  >
                    $
                  </Box>
                  <NumberInput
                    defaultValue={donationAmount}
                    min={10}
                    onChange={handleNewAmount}
                    clampValueOnBlur={false}
                    color='boulder'
                    id='amount'
                    padding='0'
                  >
                    <NumberInputField
                      className={styles.donateInput}
                      marginBottom='0'
                      marginTop='0'
                      maxW='8ch'
                      padding='.5rem'
                      border='1px solid transparent !important'
                    />
                  </NumberInput>
                </Box>
                {amountError && (
                  <ErrorMessage msg={amountError} marginTop='1rem' />
                )}
              </Box>
              {isNewDonor && <BillingForm />}
              {!isNewDonor && (
                <Box marginBottom='1.5rem'>
                  <FBButton
                    onClick={() => setUpdatingDonorStatus(true)}
                    backgroundColor='white'
                    color='#b9423a'
                    fontWeight='600'
                    padding='.5rem .5rem .5rem 0'
                  >
                    <Box as='span' display='flex' alignItems='center'>
                      <Icon name='delete' fontSize='1rem' marginRight='1rem' />
                      Discontinue monthly contribution
                    </Box>
                  </FBButton>
                </Box>
              )}
            </Box>
          </ModalBody>
          {submitError && <ErrorMessage msg={submitError} marginTop='1rem' />}
          <ModalFooter display='flex' justifyContent='space-evenly'>
            <FBButton
              onClick={onClose}
              className='u-box-shadow'
              backgroundColor='lightRock'
              color='ocean'
              fontWeight='600'
            >
              <Box as='span' display='flex' alignItems='center'>
                <Icon name='close' fontSize='1rem' marginRight='1rem' />
                Cancel
              </Box>
            </FBButton>
            <FBButton
              onClick={handleSaveChanges}
              isLoading={submitLoading}
              loadingText='Saving changes…'
              className='u-box-shadow'
              fontWeight='600'
            >
              <Box as='span' display='flex' alignItems='center'>
                <Icon name='check' fontSize='1rem' marginRight='1rem' />
                Save changes
              </Box>
            </FBButton>
          </ModalFooter>
        </>
      )}
    </Box>
  )
}

export default EditDonationModalBody
