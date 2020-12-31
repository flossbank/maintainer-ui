import { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

import { Box, ModalBody, ModalFooter, Icon } from '@chakra-ui/core'

import BillingForm from '../../dashboard/billingForm'
import FBButton from '../../common/fbButton'
import ErrorMessage from '../../common/errorMessage'

const UpdateBilling = ({ updateBillingInfo, onClose }) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState('')
  const [submitError, setSubmitError] = useState(""); // eslint-disable-line

  const handleSaveBilling = async () => {
    setSubmitLoading(true)
    // prevent quick button flash from isLoading event when there is a known error with the card
    if (cardError) {
      setSubmitLoading(false)
      return
    }

    let token

    try {
      const cardElement = elements.getElement(CardElement)
      const res = await stripe.createToken(cardElement)
      token = res.token
      updateBillingInfo(token.card.last4)
    } catch (e) {
      setSubmitError(e.message)
      setSubmitLoading(false)
      return
    }

    if (!token) {
      setCardError('Invalid credit card information')
      setSubmitLoading(false)
    }

    // TODO: handle updating billing info; call onClose at the end of success
  }

  return (
    <>
      <ModalBody>
        <BillingForm />
      </ModalBody>
      {cardError && <ErrorMessage msg={cardError} marginTop='1rem' />}
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
          onClick={handleSaveBilling}
          isLoading={submitLoading}
          loadingText='Saving billing information…'
          className='u-box-shadow'
          fontWeight='600'
        >
          <Box as='span' display='flex' alignItems='center'>
            <Icon name='check' fontSize='1rem' marginRight='1rem' />
            Save billing information
          </Box>
        </FBButton>
      </ModalFooter>
    </>
  )
}

export default UpdateBilling
