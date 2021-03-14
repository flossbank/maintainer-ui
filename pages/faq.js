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
        <FAQHeading>What if I stop maintaining a package?</FAQHeading>
        <Text marginBottom='1.5rem'>
          Anyone who has permissions to publish a package can share a publisher token with us (npm read-only token)
          and gain access to the package. So if you stop maintaining a package, and others continue maintaining it, as
          long as they have publish permissions on the package registry, they'll be able to log in and access the revenue
          for that package. If no one takes over maintaining the package, and it continues receiving revenue, you will
          continue receiving payouts for that revenue.
        </Text>
        <Divider />
        <FAQHeading>Can I add someone else to the package maintainer list?</FAQHeading>
        <Text marginBottom='1.5rem'>
          Yes! You can add someone who is involved with issue maintenance, documentation, or any other task.
          You'll be able to invite them via their email to log-in to the list of maintainers for your package.
          They'll be marked as a read-only maintainer, meaning they won't be able to adjust revenue percentage shares
          amongst the maintainers, but they'll be able to receive revenue the exact same. If you want to invite someone
          who has publish access to the package, they can log in themselves and give us a read-only registry token
          to be added to the maintainer list as an "administrator". Anyone who has publish permission for the registry will
          also have "edit" permissions for revenue shares of a package maintainers.
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
