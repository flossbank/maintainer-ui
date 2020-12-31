import { Text } from '@chakra-ui/core'

import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import Card from '../components/common/card'
import UnderlinedHeading from '../components/common/underlinedHeading'
import TextLink from '../components/common/textLink'
import FAQHeading from '../components/common/faqHeading'
import Divider from '../components/common/divider'

const FAQ = () => (
  <PageWrapper title='FAQs'>
    <Section
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '3rem 7.5rem 6rem' }}
      backgroundColor='lightRock'
    >
      <UnderlinedHeading as='h1' text='FAQs' align='center' />
      <Card shadowSz='lg' maxW='60rem'>
        <FAQHeading>How is money distributed to my packages?</FAQHeading>
        <Text marginBottom='1.5rem'>
          Donations are distributed based on the usage of your package in the dependency tree. For example,
          if your package is used along side one other dependency in a project, and the company donates 10 dollars,
          you will receive 5 dollars as you'd split it with the other dependency. 
        </Text>
        <Divider />
        <FAQHeading textAlign='center'>I still have a question</FAQHeading>
        <Text marginBottom='1.5rem' textAlign='center'>
          <TextLink text='Contact us' href='contact' /> and we'll address it
          ASAP!
        </Text>
      </Card>
    </Section>
  </PageWrapper>
)

export default FAQ
