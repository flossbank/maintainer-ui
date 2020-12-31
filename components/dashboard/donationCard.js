import { useState, useRef } from 'react'

import {
  Flex,
  IconButton,
  Text,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/core'

import { useAuth } from '../../utils/useAuth'

import DashboardDataCard from '../dashboard/dashboardDataCard'
import UnderlinedHeading from '../common/underlinedHeading'

import EditDonationModalBody from './donation/editDonationModalBody'
import StripeWrapper from '../common/stripe/stripeWrapper'
import DonationInfoModalBody from './donation/donationInfoModalBody'

const DonationCard = ({ donationAmount, donationLoading, hasDonation, refreshDashboard }) => {
  const user = useAuth().user

  const [createNewDonation, setCreateNewDonation] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()

  const handleClose = async () => {
    setCreateNewDonation(false)
    onClose()
    await refreshDashboard()
  }

  return (
    <>
      <DashboardDataCard backgroundColor='ocean' color='white'>
        {!donationLoading && (
          <Flex align='center' justify='space-between'>
            <Text
              fontSize='2.25rem'
              letterSpacing='3px'
              marginRight='2rem'
            >
              ${donationAmount}
            </Text>
            {user && (
              <IconButton
                ref={finalRef}
                onClick={onOpen}
                backgroundColor='transparent'
                fontSize='1.5rem'
                _hover={{
                  backgroundColor: 'white',
                  color: 'ocean'
                }}
                _focus={{
                  outlineColor: 'currentColor !important'
                }}
                aria-label='Edit monthly donation'
                icon='pencil'
                title='Edit monthly donation'
              />
            )}
          </Flex>
        )}
        <UnderlinedHeading
          as='h3'
          fontSize='1rem'
          letterSpacing='0'
          fontWeight='normal'
          textTransform='none'
          id='donation-amt'
          text='Monthly donation'
          align='left'
          lineColor='white'
          marginBottom='0.5rem'
        />
        {donationLoading && <CircularProgress isIndeterminate color='ocean' />}
      </DashboardDataCard>
      <Modal
        isOpen={isOpen}
        size='xl'
        closeOnOverlayClick={false}
        onClose={onClose}
        aria-live='polite'
        aria-atomic='true'
      >
        <ModalOverlay backgroundColor='rgba(0, 0, 0, .75)' />
        <ModalContent backgroundColor='white' padding='2rem'>
          <ModalHeader>
            <UnderlinedHeading
              text={
                hasDonation
                  ? 'Edit your contribution'
                  : 'Become a monthly supporter'
              }
              align='left'
              marginBottom='0'
            />
          </ModalHeader>
          <ModalCloseButton />
          {(hasDonation || createNewDonation) ? (
            <StripeWrapper>
              <EditDonationModalBody
                donationAmount={donationAmount}
                isNewDonor={!hasDonation}
                onClose={handleClose}
              />
            </StripeWrapper>
          ) : (
            <DonationInfoModalBody
              upgradeToDonor={() => setCreateNewDonation(true)}
              onClose={handleClose}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default DonationCard
