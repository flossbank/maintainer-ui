import { Link as ChakraLink, Box } from '@chakra-ui/core'
import Link from 'next/link'
import FullLogo from './fullLogo'
import FBLogoLetters from './logoLetters'

import { useLocalStorage } from '../../../utils/useLocalStorage'
import { localStorageMaintainerKey } from '../../../utils/constants'

/*
We're doing it this way, using media queries to decide which logo to show, because
when using `useMedia`, we'd get an initial flash without the full logo on each page load / route change
Even that short amount of time for the useMedia hook to run was long enough to cause the issue which made for an unpleasant flash of unstyled content.
*/

const FBLogo = ({ authed }) => {
  const [currentMaintainerId, _] = useLocalStorage(localStorageMaintainerKey, '') // eslint-disable-line
  const href = authed ? `/organization/${currentMaintainerId}` : '/'

  return (
    <Link href={href}>
      <ChakraLink href={href} aria-label='Flossbank – Home'>
        <Box display={{ base: 'none', md: 'initial' }} aria-hidden='true'>
          <FullLogo />
        </Box>
        <Box display={{ base: 'initial', md: 'none' }} aria-hidden='true'>
          <FBLogoLetters id='letter-logo-header' />
        </Box>
      </ChakraLink>
    </Link>
  )
}

export default FBLogo
