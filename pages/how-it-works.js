import { Text } from '@chakra-ui/react'

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
          Open Source code that has direct and serious revenue impact for companies. So why don't
          the companies kick back a portion of their revenue to the maintainers who built and maintain the code?
        </Text>
        <Text marginBottom='1rem'>
          Well, as it is today, it's hard and unsustainable. How do companies decide where to give? And imagine
          trying to keep up with donations to the projects they use? Tech moves fast, we can't expect
          company execs to move as quickly when updating their donations.
          We built Flossbank to enable companies and individuals to easily give back to all the Open
          Source projects they rely on in a one-time donation step.
        </Text>
        <Text marginBottom='1rem'>
          As the maintainer, you will get a financial kick back if any company or developer who is giving through
          Flossbank installs your project. The share of the donation your package gets is based on the weight your package
          plays in the "mass" of a project being donated to. In other words, based on the number of times
          your package is used in the dependency tree and the depth at which it is used, you will receive compenstation.
        </Text>
        <Text marginBottom='1rem'>
          If you'd like to increase your revenue, encourage users in your package README to use Flossbank
          during their development flow. Check out <TextLink href='/brand-guidelines' text='our brand guidelines' /> to
          copy a snippet for your README. Our CLI allows users of your code to give back to you, for free,
          by seeing ads in their terminal (if desired) during the installation of your package or any package that depends
          on yours. Alternatively, they can of course donate through Flossbank, which distributes their donation
          to any OSS project they install during their day to day developing. They can install Flossbank
          at <TextLink href='https://flossbank.com' external text='https://flossbank.com' />.
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
