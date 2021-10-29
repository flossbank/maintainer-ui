import { Box, Text } from '@chakra-ui/react'

import Section from '../common/section'
import UnderlinedHeading from '../common/underlinedHeading'
import Subheading from '../common/subheading'
import WomanWorking from './womanWorking'

const AboutUsSection = () => (
  <Section
    display='grid'
    justifyItems={{ base: 'center', lg: 'start' }}
    gridTemplateColumns={{ base: '1fr', lg: 'minmax(18rem, 1fr) 1fr' }}
    alignItems='center'
    gridTemplateRows='1fr'
    gridColumnGap={{ lg: '4rem', xl: '8rem' }}
    padding={{ base: '3rem 1.5rem', lg: '6rem 7.5rem' }}
    backgroundColor='lightRock'
  >
    <UnderlinedHeading
      text='About Us'
      align={{ base: 'center', lg: 'left' }}
      gridColumn={{ base: 1, lg: 2 }}
      marginBottom={{ base: '2rem', lg: 0 }}
    />
    {/* TODO a11y: add desc for image */}
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
      <Subheading align={{ base: 'center', lg: 'left' }}>
        Who are we?
      </Subheading>
      <Box marginBottom='3rem'>
        <Text marginBottom='1rem'>
          We're a group of developers who believe Open Source code begets technological progress.
        </Text>
        <Text marginBottom='1rem'>
          Every fortune 500 company utilizes Open Source code, yet less than 1% of fortune 500 companies
          give back to the authors and maintainers writing the Open Source code.
        </Text>
        <Text marginBottom='1rem'>
          Are we trying to make money? No. Our goal is to normalize giving back to authors and maintainers. That's why
          we take a meazly 1% of donations to keep the lights on. If, over time this seems like too much, we'll drop the
          fee even lower. We want to take just enough to power our servers that distribute and process donations.
        </Text>
        <Text>
          What's more, we subscribe to the belief that <i>good software can come from anywhere</i>.
          Right now, most Open Source engineers are capable of working on Open Source because they have another full time job
          that pays the bills. Because most full time engineering jobs employ both locale and background homogonous groups,
          opportunity is ample for Open Source to become more diverse. A more diverse Open Source contributing pool means more
          diverse software, and because functions are opinions baked into code, the software world is better for it.
        </Text>
        <Text marginBottom='1rem'>
          At Flossbank's core, we believe that if we can normalize giving back to the authors and maintainers
          writing Open Source code, the tech community will be safer, more inclusive, and overall better for it.
        </Text>
        <Text marginBottom='1rem'>
          We’re super excited about this product and truly believe whatever the size of the step, it's a step in
          the right direction.
        </Text>
        <Text>Want to help us on our mission to fund Open Source?</Text>
        <Text>Get in touch.</Text>
      </Box>
    </Box>
  </Section>
)

export default AboutUsSection
