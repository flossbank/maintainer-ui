import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import BackButton from '../../../components/common/backButton'
import PageWrapper from '../../../components/common/pageWrapper'
import Section from '../../../components/common/section'
import UnderlinedHeading from '../../../components/common/underlinedHeading'

import ManageMaintainersSection from '../../../components/maintainer/settings/manageRevenueSection'
import { useAuth } from '../../../utils/useAuth'

import {
  getPackage
} from '../../../client'

const Manage = () => {
  const user = useAuth().user
  const router = useRouter()

  const [pkg, setPkg] = useState({})

  async function fetchPkg () {
    await fetchPackage()
  }

  async function fetchPackage () {
    if (!router.query || !router.query.packageId) return
    const pkgId = router.query.packageId
    try {
      const pkgRes = await getPackage({ packageId: pkgId })
      setPkg(pkgRes.package)
    } catch (e) {
      console.log('here', e)
    }
  }

  useEffect(() => {
    fetchPkg()
  }, [router.query]) // only run on mount

  return (
    <PageWrapper title='Manage package'>
      <Section
        display='flex'
        minHeight='80vh'
        justifyItems='center'
        flexDirection='column'
        alignItems='center'
        padding={{ base: '3rem 1.5rem', lg: '4rem 7.5rem' }}
        backgroundColor='lightRock'
      >
        <BackButton />
        <UnderlinedHeading
          as='h1'
          text='Manage maintainer revenue split'
          align='center'
          marginBottom='3rem'
        />
        {pkg && pkg.maintainers && <ManageMaintainersSection user={user} pkg={pkg} />}
      </Section>
    </PageWrapper>
  )
}

export default Manage
