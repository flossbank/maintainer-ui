import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  CircularProgress,
  Text,
  Box,
  List,
  Image,
  ListItem,
  Flex,
  Input
} from '@chakra-ui/core'
import debounce from 'p-debounce'

import UnderlinedHeading from '../components/common/underlinedHeading'
import { useLocalStorage } from '../utils/useLocalStorage'
import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import WomanWorking from '../components/completeLogin/womanWorking'

import { localStoragePackageKey } from '../utils/constants'

import { fetchPackagesByName } from '../client'

const FindPackagesPage = () => {
  const router = useRouter()

  const [fetchingPackages, setFetchingPackages] = useState(false)
  const [packages, setPackages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchInvoked, setSearchInvoked] = useState(false)
  const [_, setCurrentPackageState] = useLocalStorage(localStoragePackageKey, '') // eslint-disable-line
  const subheadingExistingPackages = 'Flossbank may not be aware of a package as we may have not encountered it in a dependency tree snapshot yet'

  const goToPackage = ({ id }) => {
    setCurrentPackageState(id)
    router.push(`/packages/${id}`)
  }

  const findPackagesDebounce = debounce(async (name) => {
    setFetchingPackages(true)
    setPackages([])
    setSearchInvoked(!!name)
    try {
      const packagesRes = await fetchPackagesByName({ name })
      setPackages(packagesRes.packages || [])
    } catch (e) {} finally {
      setFetchingPackages(false)
      setIsLoading(false)
    }
  }, 350)

  const findPackages = (e) => findPackagesDebounce(e.target.value.trim().toLowerCase())

  return (
    <PageWrapper title='Log In'>
      <Section
        backgroundColor='lightRock'
        minHeight='85vh'
        aria-live='polite'
        aria-atomic='true'
        aria-busy={isLoading}
        display='grid'
        justifyItems={{ base: 'center', lg: 'start' }}
        gridTemplateColumns={{ base: '1fr', lg: 'minmax(18rem, 1fr) 1fr' }}
        alignItems='center'
        gridTemplateRows='1fr'
        gridColumnGap={{ lg: '4rem', xl: '8rem' }}
        padding={{ base: '3rem 1.5rem', lg: '6rem 7.5rem' }}
      >
        <Box
          width={{ base: '60%', md: '40%', lg: '100%' }}
          marginBottom={{ base: '3rem', lg: 0 }}
          marginTop={{ lg: '1.5rem' }}
          position={{ lg: 'sticky' }}
          top={{ lg: '10%' }}
          gridColumn='1'
          alignSelf='baseline'
        >
          <WomanWorking />
        </Box>
        <Box gridColumn={{ base: 1, lg: 2 }} maxW={{ base: '80ch', lg: '55ch' }}>
          <UnderlinedHeading
            marginBottom='3rem'
            text='Enter package name:'
            align='left'
          />
          <Text marginBottom='2rem'>
            {subheadingExistingPackages}
          </Text>
          <Flex flexDirection='row' marginBottom='1rem' border='1px solid gray' borderRadius='0.5rem'>
            <Box borderLeft='1px solid black' width='100%'>
              <Input
                id='package-name'
                placeholder='js-deep-equals'
                onChange={findPackages}
                type='text'
                aria-describedby='package-name-label'
                name='package name'
              />
            </Box>
          </Flex>
          <List spacing={3} margin=''>
            {fetchingPackages && (
              <ListItem>
                <CircularProgress isIndeterminate color='ocean' />
              </ListItem>
            )}
            {packages && packages.map(pkg => (
              <ListItem
                key={pkg.id}
                _hover={{ backgroundColor: 'puddle', cursor: 'pointer' }}
                onClick={() => goToPackage({ id: pkg.id })}
                borderRadius='5px'
                width='100%'
              >
                <Flex flexDirection='row'>
                  <Image width='5rem' height='5rem' borderRadius='1rem' src={pkg.avatarUrl} />
                  <Flex marginLeft='1rem' flexDirection='column' justifyContent='center'>
                    <Text textTransform='uppercase' fontWeight='bold'>{pkg.name}</Text>
                  </Flex>
                </Flex>
              </ListItem>
            ))}
            {!packages.length && searchInvoked && (
              <ListItem
                borderRadius='5px'
                width='100%'
              >
                <Text textTransform='uppercase' fontWeight='bold'>No results</Text>
              </ListItem>
            )}
          </List>
        </Box>
      </Section>
    </PageWrapper>
  )
}

export default FindPackagesPage
