import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Heading, Text } from '@chakra-ui/core'

import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import BouncyLoader from '../components/common/bouncyLoader'
import { useLocalStorage } from '../utils/useLocalStorage'
import { localStorageOrgKey } from '../utils/constants'

import { installOrg } from '../client/index'

const CompleteLoginPage = () => {
  const router = useRouter()
  const [status, setStatus] = useState('Completing Installation...')
  const [isLoading, setIsLoading] = useState(false)
  const [subHeader, setSubHeader] = useState('')
  const [installAttempted, setInstallAttempted] = useState(false)
  const [_, setCurrentOrgState] = useLocalStorage(localStorageOrgKey, '') // eslint-disable-line

  function showError () {
    setIsLoading(false)
    setStatus('Installation Failed')
    setSubHeader('It looks like our GitHub connection has been lost.')
  }

  async function attemptCompleteInstall () {
    setIsLoading(true)
    try {
      const { installation_id: installationId } = router.query

      // TODO: do something if there's no instalation id
      if (!installationId) {
        if (installAttempted) {
          showError()
          return
        }
      }

      setInstallAttempted(true)
      const { organization } = await installOrg({ installationId })
      setCurrentOrgState(organization.id)
      router.push(`/organization/${organization.id}`)
    } catch (e) {
      showError()
      setIsLoading(false)
    }
  }

  useEffect(() => {
    attemptCompleteInstall()
  }, [router.query])

  return (
    <PageWrapper title='Log In'>
      <Section
        backgroundColor='lightRock'
        minHeight='85vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flex='1'
        flexDirection='column'
        paddingBottom={{ lg: '6rem !important' }}
        aria-live='polite'
        aria-atomic='true'
        aria-busy={isLoading}
      >
        <Heading marginBottom='3rem' color='boulder' fontWeight='400'>
          {status}
        </Heading>
        {isLoading && <BouncyLoader />}
        {subHeader && <Text>{subHeader}</Text>}
      </Section>
    </PageWrapper>
  )
}

export default CompleteLoginPage
