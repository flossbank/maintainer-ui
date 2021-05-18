import { useState, useRef } from 'react'

import {
  Text,
  Button,
  Box,
  useDisclosure
} from '@chakra-ui/core'

import TextLink from '../../common/textLink'
import SettingsCard from './settingsCard'
import UpdateIlpModal from '../../common/updateIlpModal'

const BillingInfo = ({ ilpPointer }) => (
  <Box as='dl' display='flex'>
    <Box as='dt' fontWeight='500' marginRight='1rem'>
      ILP Pointer:
    </Box>
    <Box as='dd'>
      {ilpPointer}
    </Box>
  </Box>
)

const BillingInformationSection = ({ user }) => {
  const [ilpPointer, setIlpPointer] = useState(
    user && user.payoutInfo && user.payoutInfo.ilpPointer
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()

  const handleUpdateIlpPointer = (ilpPointer) => {
    setIlpPointer(ilpPointer)
    onClose()
  }

  return (
    <>
      <SettingsCard headingText='Billing Information'>
        <Box marginBottom='1.5rem'>
          {!ilpPointer && (
            <>
              <Text marginBottom='1.5rem'>
                <strong>
                  You currently have no ILP pointer on file.
                </strong>
              </Text>
              <Text>
                Adding an ILP pointer allows us to automatically send you money each
                month.
              </Text>
              <TextLink text='Click here to learn how to receive an ILP pointer' href='/wallet-overview' />.
            </>
          )}
          {ilpPointer && <BillingInfo ilpPointer={ilpPointer} />}
        </Box>
        <Button
          backgroundColor='puddle'
          color='ocean'
          className='u-box-shadow'
          borderRadius='5px'
          padding='1rem'
          height='auto'
          lineHeight='1.2'
          transition='all 300ms ease-in-out'
          _hover={{
            backgroundColor: 'ocean',
            color: 'white',
            transform: 'translateY(3px)'
          }}
          _active={{
            backgroundColor: 'ocean',
            color: 'white'
          }}
          ref={finalRef}
          onClick={onOpen}
        >
          {ilpPointer
            ? 'Update ILP pointer'
            : 'Add ILP pointer'}
        </Button>
      </SettingsCard>

      <UpdateIlpModal isOpen={isOpen} handleUpdateIlpPointer={handleUpdateIlpPointer} onClose={onClose} />
    </>
  )
}
export default BillingInformationSection
