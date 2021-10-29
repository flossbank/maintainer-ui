import { Box, Flex } from '@chakra-ui/react'

import LinkBtn from '../common/linkBtn'
import UnderlinedHeading from '../common/underlinedHeading'
import WhyFBCards from './cards/whyFBCards'
import Section from '../common/section'

const SplashWhatIsFlossbank = () => (
  <Section
    justifyItems='center'
    alignItems='center'
    backgroundColor='white'
  >
    <UnderlinedHeading
      text='Why Flossbank'
      textAlign='center'
      marginBottom={{ base: '4rem' }}
    />
    <Box>
      <WhyFBCards />
      <Flex justify={{ base: 'center' }} align='center' marginTop='1rem'>
        <LinkBtn
          href='/how-it-works'
          className='u-box-shadow'
          padding='.75rem'
          minW={{ base: '6rem', sm: '10rem' }}
          backgroundColor='ocean'
          color='white'
          margin={{ base: '0 0 0 0' }}
        >
          How it works
        </LinkBtn>
      </Flex>
    </Box>
  </Section>
)

export default SplashWhatIsFlossbank
