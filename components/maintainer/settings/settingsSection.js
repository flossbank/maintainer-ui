import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Section from '../../common/section'
import UnderlinedHeading from '../../common/underlinedHeading'

import BillingInformationSection from './billingInformationSection'
import UsernameSection from './usernameSection'
import { useAuth } from '../../../utils/useAuth'

const MaintainerSettingsSection = () => {
  const router = useRouter()
  const auth = useAuth()
  const [user, setUser] = useState(auth.user)

  async function resumeUser () {
    await auth.resume()
    setUser(auth.user)
  }

  useEffect(() => {
    resumeUser()
  }, [router.query])

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
      {user && <BillingInformationSection user={user} />}
      {user && <UsernameSection user={user} />}
    </Section>
  )
}

export default MaintainerSettingsSection
