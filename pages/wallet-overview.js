import { Text } from '@chakra-ui/react'

import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import Card from '../components/common/card'
import UnderlinedHeading from '../components/common/underlinedHeading'
import TextLink from '../components/common/textLink'
import FAQHeading from '../components/common/faqHeading'

const HowItWorks = () => (
  <PageWrapper title='Wallet Overview'>
    <Section
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '3rem 7.5rem 6rem' }}
      backgroundColor='lightRock'
    >
      <UnderlinedHeading as='h1' text='ILP Wallet Overview' align='center' />
      <Card shadowSz='lg' maxW='60rem'>
        <Text marginBottom='1rem'>
          For you to receive payments from Flossbank, you must have an account with a digital wallet
          that supports <TextLink href='https://interledger.org/' external text='Interledger' />. Interledger is what Flossbank uses to send payments, so
          your wallet provider must support Interledger to receive those payments.
        </Text>
        <Text marginBottom='2rem'>
          Currently, <TextLink href='https://uphold.com/' external text='Uphold' /> is the best option for a wallet provider.
          Uphold supports over 60 currencies including USD, EUR, GBP, CAD, PLN, XRP,
          BTC, ETH, <TextLink href='https://uphold.com/en/transparency' external text='and more' />.
        </Text>
        <FAQHeading>Identity Verification</FAQHeading>
        <Text marginBottom='1rem'>
          You must verify who you are before withdrawing funds from Uphold. You can open an account and begin
          receiving funds, but in order to withdraw
          funds, <TextLink href='https://support.uphold.com/hc/en-us/articles/202766795' external text='you must verify your identity' />.
        </Text>
        <Text marginBottom='2rem'>
          It could take some time to verify your identity, so if you're in a rush, start early.
        </Text>
        <FAQHeading>Payment Pointers</FAQHeading>
        <Text marginBottom='1rem'>
          After you open an account with Uphold, they will assign you a payment pointer.
          You can find that pointer by following these <TextLink href='https://support.uphold.com/hc/en-us/articles/360043227832-How-to-find-your-ILP-address-Interledger-payment-pointer-' external text='Uphold instructions' />.
          A payment pointer is required for you to receive money from Flossbank.
          You can think of it as an address of where we should send your money. The pointer is used
          to retrieve a special, one-time payment address along with a secret. This is used to
          send the money to your wallet.
        </Text>
        <Text marginBottom='2rem'>
          Payment pointers are similar to a URL, but they'll start with a $. An example of an Uphold ILP Pointer
          could be: $ilp.uphold.com/ABC3DefGHi67jk
        </Text>
        <FAQHeading>What is Interledger and why does Flossbank use it?</FAQHeading>
        <Text marginBottom='2rem'>
          Interledger is an open protocol suite that Flossbank uses to send payments.
          As such, digital wallet providers that want to accept payments from Flossbank must also support with Interledger.
          You can learn more about Interledger at <TextLink href='interledger.org' text='interledger.org' external />.
        </Text>
        <FAQHeading>Is Interledger a cryptocurrency?</FAQHeading>
        <Text marginBottom='2rem'>
          No, Interledger is simply a mechanism of moving value. Flossbank initially calculates payouts in USD,
          however Uphold allows you to exchange the amount you receive into any of their other supported currencies before
          withdrawing.
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
