import { useEffect, useState } from 'react'

import {
  Text,
  Alert,
  AlertIcon,
  List,
  Link,
  useDisclosure,
  ListItem,
  CircularProgress,
  Flex
} from '@chakra-ui/core'

import { useLocalStorage } from '../utils/useLocalStorage'
import { useAuth } from '../utils/useAuth'
import {
  localStorageDashboardWelcomeBannerKey
} from '../utils/constants'
import { getOwnedPackages } from '../client/index'

import TextLink from '../components/common/textLink'
import UnderlinedHeading from '../components/common/underlinedHeading'
import Banner from '../components/common/banner'
import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import UsernameModal from '../components/dashboard/usernameModal'

const Dashboard = () => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useLocalStorage(
    localStorageDashboardWelcomeBannerKey,
    true
  )

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ownedPkgs, setOwnedPkgs] = useState([])
  const [ownedPkgsLoading, setOwnedPkgsLoading] = useState(true)

  const { user } = useAuth()

  async function fetchData () {
    try {
      const res = await getOwnedPackages()
      if (res.success) setOwnedPkgs(res.packages)
    } catch (e) {

    } finally {
      setOwnedPkgsLoading(false)
    }

    if (!user.username) onOpen()
  }

  useEffect(() => {
    fetchData()
  }, [0]) // only run on mount

  return (
    <PageWrapper title='Dashboard'>
      {showWelcomeMessage && (
        <Banner icon='hooray' onCloseClick={() => setShowWelcomeMessage(false)}>
          <Text color='rock'>
            Thanks for using Flossbank! To maximize the revenue you make through
            Flossbank, we encourage maintainers to encourage their users via their package
            README's to install Flossbank and use it within their daily flow.
          </Text>
        </Banner>
      )}
      <Section
        backgroundColor='lightRock'
        justifyContent='center'
      >
        <UsernameModal isOpen={isOpen} onClose={onClose} />
        <UnderlinedHeading
          text='Maintained packages'
          align={{ base: 'center', lg: 'left' }}
          marginBottom='2rem'
        />
        {ownedPkgsLoading && (
          <CircularProgress isIndeterminate color='ocean' />
        )}
        {!ownedPkgsLoading && !ownedPkgs.length && (
          <Alert
            status='info'
            backgroundColor='puddle'
            color='ocean'
            fontWeight='500'
            marginBottom='1.5rem'
          >
            <AlertIcon color='ocean' />
            <Text>
              We have no records of owned
              packages, <TextLink text='click here' href='/import-packages' /> to
              enter in your package registry token
              to prove ownership of packages so we can start getting you paid.
            </Text>
          </Alert>
        )}
        {!ownedPkgsLoading && !!ownedPkgs.length && (
          <List marginBottom='2rem'>
            {ownedPkgs.map((pkg) => (
              <ListItem key={pkg.id}>
                <Link href={`/package/${pkg.id}`}>
                  <Flex flexDirection='row'><Text fontWeight='bold'>{pkg.registry.toUpperCase()}</Text><Text>: {pkg.name}</Text></Flex>
                </Link>
              </ListItem>
            ))}
          </List>
        )}
        <UnderlinedHeading
          text='Wallet'
          align={{ base: 'center', lg: 'left' }}
          marginBottom='2rem'
        />
        <UnderlinedHeading
          text='Payout method'
          align={{ base: 'center', lg: 'left' }}
          marginBottom='2rem'
        />
        {!user.billingInfo.payout && (
          <Alert
            status='info'
            backgroundColor='puddle'
            color='ocean'
            fontWeight='500'
            marginBottom='1.5rem'
          >
            <AlertIcon color='ocean' />
            <Text>
              We currently don't have a payout method for you, please
              enter in an ILP payment pointer or an Open Collective Link
              to begin getting paid for your maintained packages immediately.
            </Text>
          </Alert>
        )}
      </Section>
    </PageWrapper>
  )
}

export default Dashboard
