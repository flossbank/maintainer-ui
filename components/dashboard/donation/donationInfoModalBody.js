import { Box, Icon, Text, ModalFooter, ModalBody } from '@chakra-ui/core'

import FBButton from '../../common/fbButton'

const DonationInfoModalBody = ({ upgradeToDonor }) => {
  const handleDonorUpgrade = () => {
    upgradeToDonor(true)
  }

  return (
    <>
      <ModalBody marginBottom='1.5rem'>
        <Text marginBottom='1.5rem'>
          By becoming a monthly contributor and donating at least
          <strong> $10 a month</strong>, you're supporting the OSS maintainers
          of the packages your company relies on, making them not only better maintainer, but
          more secure.
        </Text>
        <Text marginBottom='1.5rem'>
          Monthly donations are split up amongst the packages we detect in your GitHub repositories.
        </Text>
      </ModalBody>
      <ModalFooter display='flex' flexDirection='column' alignItems='center'>
        <FBButton
          onClick={handleDonorUpgrade}
          className='u-box-shadow'
          fontWeight='600'
          margin='0 0 1.5rem 0'
        >
          <Box as='span' display='flex' alignItems='center'>
            <Icon name='check' fontSize='1rem' marginRight='1rem' />
            Become a monthly supporter
          </Box>
        </FBButton>
      </ModalFooter>
    </>
  )
}

export default DonationInfoModalBody
