import {
  Code,
  Text,
  Box,
  Button,
  Link,
  Icon
} from '@chakra-ui/core'

import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import Card from '../components/common/card'
import UnderlinedHeading from '../components/common/underlinedHeading'
import TextLink from '../components/common/textLink'
import FAQHeading from '../components/common/faqHeading'

const About = () => (
  <PageWrapper
    title='Brand'
    description='This page outlines guidelines on using the Flossbank brand on external content'
  >
    <Section
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '3rem 7.5rem 6rem' }}
      backgroundColor='lightRock'
    >
      <UnderlinedHeading
        text='Brand Guidelines'
        as='h1'
        align={{ base: 'center' }}
      />
      <Card shadowSz='lg' maxW='60rem'>
        <FAQHeading>Brand guidelines</FAQHeading>
        <Text marginBottom='2rem'>
          The Flossbank brand includes the words, phrases, symbols, designs and other distinctive brand features associated with Flossbank and our services (“Brand Assets”).
        </Text>
        <Text marginBottom='2rem'>
          We recommend placing the following text into your Open Source project README's in order to garner
          the most support for your projects.
        </Text>
        <Code marginBottom='2rem'>
          This project benefits from Flossbank users. <br /><br />If you'd like to support this Open Source project, consider installing Flossbank, a tool that
          compensates all of the Open Source projects you install with either a monthly donation or opt-in terminal ads.
          <br /><br />Learn more at https://flossbank.com
        </Code>
        <FAQHeading>Download brand assets</FAQHeading>
        <Text marginBottom='1rem'>
          Want to put our logo on your README or website? Feel free!
        </Text>
        <Box
          marginBottom='2rem'
          textAlign='left'
        >
          <Button>
            <Link href='/images/flossbank_logo_assets.zip' download='flossbank_icons' padding='1rem'>
              Download assets
              <Icon marginLeft='1rem' name='download' size='1.75rem' />
            </Link>
          </Button>
        </Box>
        <Text color='boulder' textAlign='center' fontWeight='500'>
          Have more questions? Visit our{' '}
          <TextLink href='/faq' text='FAQ page' /> to find out more.
        </Text>
      </Card>
    </Section>
  </PageWrapper>
)

export default About
