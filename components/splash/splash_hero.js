import { Box, Text, Flex } from '@chakra-ui/core'

import SplashSVG from '../../public/images/splash/splash_svg.svg'
import UnderlinedHeading from '../common/underlinedHeading'
import Subheading from '../common/subheading'

const SplashHero = () => (
  <Flex
    as='section'
    flexDirection='row'
    padding={['3rem 3rem', '5rem 8rem 0rem 8rem']}
    justifyContent='center'
    backgroundColor='lightRock'
  >
    <Flex flexDirection='column' width={['100%', '30rem']} paddingTop={['0', '8rem']}>
      <UnderlinedHeading text='Maintainer Portal' />
      <Subheading>
        The most efficient way to receive compensation for your OSS
      </Subheading>
      <Text
        id='hero_header'
        fontSize='1.25rem'
        lineHeight='normal'
        textAlign='left'
        marginBottom={{ base: '1.5rem', md: '.5rem' }}
      >
        No ads, no gimics, no agreements. Get paid based on the impact
        your Open Source code has on the world in three clicks.
      </Text>
    </Flex>
    <Box display={['none', 'none', 'none', 'inline']} maxWidth='90%'>
      <SplashSVG />
    </Box>
  </Flex>
)

export default SplashHero
