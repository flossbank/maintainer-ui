import { useEffect } from 'react'

import {
  Text
} from '@chakra-ui/core'

import { useLocalStorage } from '../utils/useLocalStorage'
import {
  localStorageDashboardWelcomeBannerKey
} from '../utils/constants'

import Banner from '../components/common/banner'
import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'

const Dashboard = () => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useLocalStorage(
    localStorageDashboardWelcomeBannerKey,
    true
  )

  async function fetchData () {}

  useEffect(() => {
    fetchData()
  }, [0]) // only run on mount

  return (
    <PageWrapper title='Dashboard'>
      <h1 className='sr-only'>Maintainer dashboard</h1>
      {showWelcomeMessage && (
        <Banner icon='hooray' onCloseClick={() => setShowWelcomeMessage(false)}>
          <Text color='rock'>
            Thanks for using Flossbank! To maximize the revenue you make through
            Flossbank, we encourage maintainers to encourage their users via package
            README's to install Flossbank and use it within their daily flow.
          </Text>
        </Banner>
      )}
      <Section
        backgroundColor='lightRock'
        justifyContent='center'
      />
    </PageWrapper>
  )
}

export default Dashboard
