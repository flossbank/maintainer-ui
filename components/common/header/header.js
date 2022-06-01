import { useAuth } from '../../../utils/useAuth'

import { Box, Flex } from '@chakra-ui/core'

import FBLogo from './logo'

const Header = () => {
  const auth = useAuth()
  const { user } = auth

  return (
    <>
      <Box as='header' padding={['1rem', '1.5rem', '1.5rem 5rem']}>
        <Flex
          alignItems='center'
          margin='auto'
          justify='space-between'
          maxW={['90rem']}
          flexDirection='row'
        >
          <FBLogo authed={!!user} />
          <Box
            as='nav'
            display='flex'
            flex='1'
            alignItems='center'
            justifyContent={user ? 'flex-end' : 'space-between'}
            marginLeft={['2.25rem', 'auto']}
            maxW={['22.5rem', '22.5rem', '22.5rem', '34.5rem']}
            aria-label='Primary navigation'
          />
        </Flex>
      </Box>
    </>
  )
}

export default Header
