import { useState, useEffect } from 'react'

import {
  getPackage
} from '../../../client'

import {
  Text,
  Box,
  Flex,
  Heading,
  List,
  Image,
  Tooltip,
  ListItem,
  CircularProgress,
  Icon
} from '@chakra-ui/core'

// import { useAuth } from '../../../utils/useAuth'

import PageWrapper from '../../../components/common/pageWrapper'
import Section from '../../../components/common/section'
import DashboardDataCard from '../../../components/dashboard/dashboardDataCard'
import { useRouter } from 'next/router'

const PackagePage = () => {
  const router = useRouter()
  // const user = useAuth().user

  const [pkgDonationRevenueLoading, setPkgDonationRevenueLoading] = useState(true)
  const [pkgDonationRevenue, setPkgDonationRevenue] = useState(0)

  const [pkgAdRevenueLoading, setPkgAdRevenueLoading] = useState(true)
  const [pkgAdRevenue, setPkgAdRevenue] = useState(0)

  const [pkg, setPkg] = useState({})

  // function resetLoaders () {
  //   setPkgAdRevenueLoading(true)
  //   setPkgDonationRevenueLoading(true)
  // }

  async function fetchAllData () {
    return fetchPackage()
  }

  async function fetchPackage () {
    if (!router.query || !router.query.packageId) return
    const pkgId = router.query.packageId
    try {
      const pkgRes = await getPackage({ packageId: pkgId })
      setPkg(pkgRes.package)
      setPkgDonationRevenue(pkgRes.package.donationRevenue ? pkgRes.package.donationRevenue / 1000 : 0)
      setPkgAdRevenue(pkgRes.package.adRevenue ? pkgRes.package.adRevenue / 1000 : 0)
    } catch (e) {
    } finally {
      setPkgDonationRevenueLoading(false)
      setPkgAdRevenueLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [router.query]) // only run on mount

  function getPackageName () {
    try {
      return pkg.name
    } catch (e) {
      console.error(e)
      return ''
    }
  }

  return (
    <PageWrapper title='Dashboard'>
      <h1 className='sr-only'>{getPackageName()}</h1>
      <Section
        minHeight='50rem'
        backgroundColor='lightRock'
        height={{ base: 'auto', lg: '90vh' }}
        display={{ md: 'grid' }}
        gridTemplateColumns={{ lg: 'repeat(4, minmax(14rem, 20rem))' }}
        justifyContent='center'
        gridColumnGap={{ md: '3rem' }}
        gridRowGap={{ base: '3rem', lg: '1rem' }}
        gridTemplateRows={{ lg: '13rem 13rem 5rem' }}
      >
        <Box gridRow='1' display={{ base: 'none', lg: 'inline' }} gridColumn='1' padding='2rem'>
          <Image height='10rem' width='10rem' borderRadius='1rem' src={pkg.avatarUrl} />
        </Box>
        <Flex flexDirection='column' justifyContent='space-around' gridRow='1' gridColumn={{ base: '1 / span 5', lg: '2 / span 4' }}>
          <Box padding={{ base: '3rem 0', lg: '0 3rem 0 3rem' }}>
            <Text>boop boop beep boop</Text>
          </Box>
        </Flex>
        <Box gridRow='2' gridColumn='1 / span 4'>
          <Heading
            textTransform='uppercase'
            letterSpacing='1px'
            fontWeight='bold'
            marginTop='0'
            fontSize='1rem'
            textAlign={{ base: 'center', md: 'left' }}
            marginBottom='1.5rem'
          >
            {getPackageName()}'s statistics
          </Heading>
          <Box>
            <List
              display={{ base: 'grid' }}
              alignItems={{ md: 'stretch', lg: 'initial' }}
              gridGap='1.75rem'
              gridTemplateColumns={{
                base: 'repeat(auto-fit, minmax(16rem, 1fr))'
              }}
              width='100%'
              margin={{ base: '0 auto 1.5rem auto' }}
            >
              <ListItem>
                <DashboardDataCard>
                  {pkgAdRevenueLoading && (
                    <CircularProgress isIndeterminate color='ocean' />
                  )}
                  {!pkgAdRevenueLoading && (
                    <Text
                      aria-describedby='packages-touched'
                      fontSize='2.25rem'
                      color='ocean'
                    >
                      {pkgAdRevenue.toFixed(2)}
                    </Text>
                  )}
                  <Flex
                    as='h3'
                    flexDirection='row'
                    fontSize='1rem'
                    fontWeight='normal'
                    id='user-session-count'
                  >
                    Ad revenue generated
                    <Tooltip
                      label='This is the total ad revenue generated for this package'
                      aria-label='A tooltip explaining that the above ad revenue is the total ad revenue generated for this package'
                    >
                      <Icon
                        name='question'
                        size={{ base: '1.5rem' }}
                        marginRight={{ base: 0 }}
                        marginBottom={{ base: '1.5rem', md: 0 }}
                      />
                    </Tooltip>
                  </Flex>
                </DashboardDataCard>
              </ListItem>
              <ListItem>
                <DashboardDataCard>
                  {pkgDonationRevenueLoading && (
                    <CircularProgress isIndeterminate color='ocean' />
                  )}
                  {!pkgDonationRevenueLoading && (
                    <Text
                      aria-describedby='user-session-count'
                      fontSize='2.25rem'
                      color='ocean'
                    >
                      {pkgDonationRevenue.toFixed(2)}
                    </Text>
                  )}
                  <Flex
                    flexDirection='row'
                    as='h3'
                    fontSize='1rem'
                    fontWeight='400'
                    id='user-session-count'
                  >
                    Donation revenue
                    <Tooltip label='This is the total donation revenue this package as accumulated through Flossbank fundraising measures'>
                      <Icon
                        name='question'
                        size={{ base: '1.5rem' }}
                        marginRight={{ base: 0 }}
                        marginBottom={{ base: '1.5rem', md: 0 }}
                      />
                    </Tooltip>
                  </Flex>
                </DashboardDataCard>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Section>
    </PageWrapper>
  )
}

export default PackagePage
