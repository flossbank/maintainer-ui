import { useState, useEffect } from 'react'

import {
  getPackage,
  getSupportingPackages
} from '../../../client'

import {
  Text,
  Box,
  Link,
  Flex,
  Heading,
  List,
  Image,
  Tooltip,
  ListItem,
  CircularProgress,
  Icon
} from '@chakra-ui/core'

import UnderlinedHeading from '../../../components/common/underlinedHeading'
import PageWrapper from '../../../components/common/pageWrapper'
import Section from '../../../components/common/section'
import DashboardDataCard from '../../../components/dashboard/dashboardDataCard'
import { useRouter } from 'next/router'

const PackagePage = () => {
  const router = useRouter()

  const [pkgDonationRevenueLoading, setPkgDonationRevenueLoading] = useState(true)
  const [pkgDonationRevenue, setPkgDonationRevenue] = useState(0)

  const [pkgAdRevenueLoading, setPkgAdRevenueLoading] = useState(true)
  const [pkgAdRevenue, setPkgAdRevenue] = useState(0)

  const [supportingCompanies, setSupportingCompanies] = useState([])

  const [pkg, setPkg] = useState({})

  async function fetchAllData () {
    await fetchPackage()
    await fetchSupportingCompanies()
  }

  async function fetchPackage () {
    if (!router.query || !router.query.packageId) return
    const pkgId = router.query.packageId
    try {
      const pkgRes = await getPackage({ packageId: pkgId })
      setPkg(pkgRes.package)
      setPkgDonationRevenue(pkgRes.package.donationRevenue ? pkgRes.package.donationRevenue / 100000 : 0)
      setPkgAdRevenue(pkgRes.package.adRevenue ? pkgRes.package.adRevenue / 100000 : 0)
    } catch (e) {
    } finally {
      setPkgDonationRevenueLoading(false)
      setPkgAdRevenueLoading(false)
    }
  }

  async function fetchSupportingCompanies () {
    if (!router.query || !router.query.packageId) return
    const pkgId = router.query.packageId
    try {
      const supportCosRes = await getSupportingPackages({ packageId: pkgId })
      setSupportingCompanies(supportCosRes.companies)
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
      <Section
        backgroundColor='lightRock'
        minHeight={{ base: 'auto', lg: '90vh' }}
        height='auto'
        justifyContent='center'
      >
        <Heading
          textTransform='uppercase'
          letterSpacing='1px'
          fontWeight='bold'
          marginTop='0'
          fontSize='1.2rem'
          textAlign={{ base: 'center', md: 'left' }}
          marginBottom='1.5rem'
        >
          {getPackageName()}
        </Heading>
        <Box
          height='auto'
          display={{ md: 'grid' }}
          gridTemplateColumns={{ lg: 'repeat(4, minmax(14rem, 20rem))' }}
          justifyContent='center'
          gridColumnGap={{ md: '3rem' }}
          gridRowGap={{ base: '3rem', lg: '3rem' }}
          gridTemplateRows={{ lg: '13rem 13rem 13rem' }}
        >
          <Box gridRow='1' display={{ base: 'none', lg: 'inline' }} gridColumn='1' padding='2rem 2rem 2rem 0'>
            {pkg.avatarUrl && (<Image height='10rem' width='10rem' borderRadius='1rem' src={pkg.avatarUrl} />)}
            {!pkg.avatarUrl && (<Image height='10rem' width='10rem' borderRadius='1rem' src={`/images/packageManagers/${pkg.registry}.png`} />)}
          </Box>
          <Flex flexDirection='column' justifyContent='space-around' gridRow='1' gridColumn={{ base: '1 / span 5', lg: '2 / span 4' }}>
            <Box padding={{ base: '3rem 0', lg: '0 3rem 0 0' }}>
              <Text>
                Check out {pkg.name}'s statistics below as well as the companies who have donated to this package.
                To increase the revenue that goes to this package, we encourage every developer to install Flossbank at
                https://flossbank.com so the packages they install are supported at no cost to you and maintenance free.
              </Text>
            </Box>
          </Flex>
          <Box gridRow='2' gridColumn='1 / span 5' width='100%'>
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
                        $ {pkgAdRevenue.toFixed(2)}
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
                          marginLeft='1rem'
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
                        $ {pkgDonationRevenue.toFixed(2)}
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
                          marginLeft='1rem'
                          marginRight={{ base: 0 }}
                          marginBottom={{ base: '1.5rem', md: 0 }}
                        />
                      </Tooltip>
                    </Flex>
                  </DashboardDataCard>
                </ListItem>
              </List>
            </Box>
            {supportingCompanies && !!supportingCompanies.length && (
              <Box gridRow='3' gridColumn='1 / span 4'>
                <UnderlinedHeading
                  marginTop='3rem'
                  text='Top Supporting Companies'
                  align={{ base: 'center', lg: 'left' }}
                  gridColumn={{ base: 1, lg: 2 }}
                  marginBottom={{ base: '2rem' }}
                />
                <List>
                  {supportingCompanies.map((s) => (
                    <ListItem key={s.organizationId}>
                      <Link
                        href={`https://enterprise.flossbank.com/organization/${s.organizationId}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Flex flexDirection='row'>
                          <Image marginRight='1rem' height='2rem' width='2rem' src={s.avatarUrl} />
                          <Flex flexDirection='column' justifyContent='center'>
                            <Flex flexDirection='row'>
                              <Text marginRight='1rem' textTransform='uppercase' fontWeight='bold'>
                                {s.name}: ${(s.contributionAmount / 100000).toFixed(2)}
                              </Text>
                              <span className='sr-only'> (opens in new window)</span>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </Box>
      </Section>
    </PageWrapper>
  )
}

export default PackagePage
