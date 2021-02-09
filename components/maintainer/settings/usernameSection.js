import { useState, useRef } from 'react'

import {
  Text,
  Button,
  Box,
  useDisclosure
} from '@chakra-ui/core'

import SettingsCard from './settingsCard'
import UpdateUsernameModal from '../../dashboard/usernameModal'

const UsernameInfo = ({ username }) => (
  <Box as='dl' display='flex'>
    <Box as='dt' fontWeight='500' marginRight='1rem'>
      Username:
    </Box>
    <Box as='dd'>
      {username}
    </Box>
  </Box>
)

const UsernameSection = ({ user }) => {
  const [username, setUsername] = useState(
    user && user.username
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()

  const handleUpdateUsername = (username) => {
    setUsername(username)
    onClose()
  }

  return (
    <>
      <SettingsCard headingText='Username'>
        <Box marginBottom='1.5rem'>
          {!username && (
            <>
              <Text marginBottom='1.5rem'>
                <strong>
                  You currently have no username on file.
                </strong>
              </Text>
              <Text>
                A username allows us to keep your email private, and allows others to identify you when
                configuring distribution percentages for packages you help maintain.
              </Text>
            </>
          )}
          {username && <UsernameInfo username={username} />}
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
          {username
            ? 'Update username'
            : 'Add username'}
        </Button>
      </SettingsCard>

      <UpdateUsernameModal isOpen={isOpen} handleUpdateUsername={handleUpdateUsername} onClose={onClose} canCloseEasily />
    </>
  )
}
export default UsernameSection
