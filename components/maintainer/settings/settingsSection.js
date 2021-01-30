import { useEffect, useState } from 'react'
import { CircularProgress, Text } from '@chakra-ui/core'

import Section from '../../common/section'
import UnderlinedHeading from '../../common/underlinedHeading'
import Banner from '../../common/banner'

import BillingInformationSection from './billingInformationSection'
import { getMaintainer } from '../../../client'

import { useLocalStorage } from '../../../utils/useLocalStorage'
import { localStorageMaintainerKey } from '../../../utils/constants'

const MaintainerSettingsSection = () => {
  const [loading, setLoading] = useState(true)
  const [maintainer, setMaintainer] = useState(undefined)

  const [currentMaintainerId, _] = useLocalStorage(localStorageMaintainerKey, '') // eslint-disable-line  

  async function fetchMaintainer () {
    try {
      const res = await getMaintainer({ maintainerId: currentMaintainerId })
      setMaintainer(res.maintainer)
    } catch (e) {} finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMaintainer()
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
      {loading && <CircularProgress isIndeterminate color='ocean' />}
      {/** Only show billing info section if billing info returned from API */}
      {maintainer && maintainer.billingInfo && <BillingInformationSection maintainer={maintainer} />}
      {/** Otherwise, notify user they must log in to see org settings */}
      {!loading && (!maintainer || !maintainer.billingInfo) && (
        <>
          <Banner icon='info' onCloseClick={() => {}}>
            <Text color='rock'>
              You must be logged in to view settings
            </Text>
          </Banner>
        </>
      )}
    </Section>
  )
}

export default MaintainerSettingsSection
