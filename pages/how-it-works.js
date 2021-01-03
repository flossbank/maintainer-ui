import { Text } from '@chakra-ui/core'

import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import Card from '../components/common/card'
import UnderlinedHeading from '../components/common/underlinedHeading'
import TextLink from '../components/common/textLink'
import FAQHeading from '../components/common/faqHeading'

const HowItWorks = () => (
  <PageWrapper title='How It Works'>
    <Section
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '3rem 7.5rem 6rem' }}
      backgroundColor='lightRock'
    >
      <UnderlinedHeading as='h1' text='How It Works' align='center' />
      <Card shadowSz='lg' maxW='60rem'>
        <FAQHeading>Getting paid for the work you do</FAQHeading>
        <Text marginBottom='1rem'>
          Right now, it's no secret that every fortune 500 company pulls in Open Source code.
          The impact of the Open Source code has direct revenue impact for companies. So why don't
          the companies kick back a portion of their revenue to the maintainers who built and maintain the code?
        </Text>
        <Text marginBottom='1rem'>
          We built Flossbank to enable companies and individuals to easily give back to all the Open
          Source projects they rely on in as easy a way as possible.
        </Text>
        <Text marginBottom='1rem'>
          As the maintainer, you will get a financial kick back based on the weight your package
          plays in the "mass" of a project being donated to. In other words, based on the number of times
          your package is used in the dependency tree and the depth at which it is used, you will receive compenstation.
        </Text>
        <Text color='boulder' textAlign='center' fontWeight='500'>
          Have more questions? Visit our{' '}
          <TextLink href='/faq' text='FAQ page' /> to find out more.
        </Text>
      </Card>
    </Section>
  </PageWrapper>
)

export default HowItWorks
