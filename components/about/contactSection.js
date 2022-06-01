import { Text } from '@chakra-ui/core'

import Section from '../common/section'
import Card from '../common/card'
import TextLink from '../common/textLink'
import UnderlinedHeading from '../common/underlinedHeading'

const ContactSection = ({ contactPage, hideHeading, ...props }) => {
  return (
    <Section
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '6rem 7.5rem' }}
      backgroundColor='white'
      {...props}
    >
      <UnderlinedHeading as={contactPage ? 'h1' : 'h2'} className={hideHeading ? 'sr-only' : ''} text='Contact Us' align='center' />
      <Card shadowSz='lg' w='100%' maxW='45rem'>
        <Text>
        You can email us directly at{' '}
          <TextLink
            text='support@flossbank.com'
            external
            href='mailto:support@flossbank.com'
          />
        .
        </Text>
      </Card>
    </Section>
  )
}

export default ContactSection
