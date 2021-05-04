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
import { AddIcon } from '@chakra-ui/icons'

import { useLocalStorage } from '../utils/useLocalStorage'
import { useAuth } from '../utils/useAuth'
import {
  localStorageDashboardWelcomeBannerKey
} from '../utils/constants'
import {
  getOwnedPackages,
  getPendingPayout
} from '../client/index'

import TextLink from '../components/common/textLink'
import UnderlinedHeading from '../components/common/underlinedHeading'
import Banner from '../components/common/banner'
import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import UsernameModal from '../components/dashboard/usernameModal'
import Card from '../components/common/card'
import FBButton from '../components/common/fbButton'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useLocalStorage(
    localStorageDashboardWelcomeBannerKey,
    true
  )

  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ownedPkgs, setOwnedPkgs] = useState([])
  const [ownedPkgsLoading, setOwnedPkgsLoading] = useState(true)

  const [pendingPayout, setPendingPayout] = useState('0')
  const [pendingPayoutLoading, setPendingPayoutLoading] = useState(true)

  const { user } = useAuth()

  async function fetchData () {
    if (!user.username) onOpen()

    try {
      const ownedPackagesRes = await getOwnedPackages()
      if (ownedPackagesRes.success) setOwnedPkgs(ownedPackagesRes.packages)

      const payoutRes = await getPendingPayout()
      if (payoutRes.success) setPendingPayout(`${payoutRes.payout.toFixed(2)}`)
    } catch (e) {

    } finally {
      setOwnedPkgsLoading(false)
      setPendingPayoutLoading(false)
    }
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
            README's to install Flossbank and use it within their daily flow. Read more
            on <TextLink href='/brand-guidelines' text='our brand guidelines page' />
          </Text>
        </Banner>
      )}
      <Section
        backgroundColor='lightRock'
        justifyContent='center'
      >
        <UsernameModal isOpen={isOpen} onClose={onClose} canCloseEasily={false} />
        <Card marginBottom='1rem'>
          <UnderlinedHeading
            text='Wallet'
            align={{ base: 'center', lg: 'left' }}
            marginBottom='2rem'
          />
          {pendingPayoutLoading && (
            <CircularProgress isIndeterminate color='ocean' />
          )}
          {!pendingPayoutLoading && (
            <Text>Upcoming payout: ${pendingPayout}</Text>
          )}
        </Card>
        <Card marginBottom='1rem'>
          <UnderlinedHeading
            text='Payout method'
            align={{ base: 'center', lg: 'left' }}
            marginBottom='2rem'
          />
          {!user.payoutInfo?.ilpPointer ? (
            <Alert
              status='info'
              backgroundColor='puddle'
              color='ocean'
              fontWeight='500'
              marginBottom='1.5rem'
            >
              <AlertIcon color='ocean' />
              <Text>
                We currently don't have a payout method for
                you, <TextLink text='please enter in an ILP payment pointer' href='/maintainer/settings' /> to
                begin getting paid for your maintained packages immediately.
              </Text>
            </Alert>
          ) : (
            <Text>Payout ILP Pointer: {user.payoutInfo.ilpPointer}</Text>
          )}
        </Card>
        <Card>
          <Flex
            flexDirection='row'
            width='100%'
            justifyContent='space-between'
          >
            <UnderlinedHeading
              text='Maintained packages'
              align={{ base: 'center', lg: 'left' }}
              marginBottom='2rem'
            />
            <FBButton height='3rem' float='right' onClick={() => router.push('/import-packages')}>
              Import Packages
              <AddIcon marginLeft='.5rem' />
            </FBButton>
          </Flex>
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
        </Card>
      </Section>
    </PageWrapper>
  )
}

export default Dashboard
