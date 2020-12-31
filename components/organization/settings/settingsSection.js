import { useEffect, useState } from 'react'
import { CircularProgress, Text } from '@chakra-ui/core'

import Section from '../../common/section'
import UnderlinedHeading from '../../common/underlinedHeading'
import Banner from '../../common/banner'

import BillingInformationSection from './billingInformationSection'
import { getOrganization } from '../../../client'

import { useLocalStorage } from '../../../utils/useLocalStorage'
import { localStorageOrgKey } from '../../../utils/constants'

const OrgSettingsSection = () => {
  const [orgLoading, setOrgLoading] = useState(true)
  const [org, setOrg] = useState(undefined)

  const [currentOrgId, _] = useLocalStorage(localStorageOrgKey, '') // eslint-disable-line  

  async function fetchOrg () {
    try {
      const res = await getOrganization({ orgId: currentOrgId })
      setOrg(res.organization)
    } catch (e) {} finally {
      setOrgLoading(false)
    }
  }

  useEffect(() => {
    fetchOrg()
  }, [])
  return (
    <Section
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '4rem 7.5rem' }}
      backgroundColor='lightRock'
    >
      <UnderlinedHeading
        as='h1'
        text='Settings'
        align='center'
        marginBottom='3rem'
      />
      {orgLoading && <CircularProgress isIndeterminate color='ocean' />}
      {/** Only show billing info section if billing info returned from API */}
      {org && org.billingInfo && <BillingInformationSection org={org} />}
      {/** Otherwise, notify user they must log in to see org settings */}
      {!orgLoading && (!org || !org.billingInfo) && (
        <>
          <Banner icon='info' onCloseClick={() => {}}>
            <Text color='rock'>
              You must be logged in to view organization settings
            </Text>
          </Banner>
        </>
      )}
    </Section>
  )
}

export default OrgSettingsSection
