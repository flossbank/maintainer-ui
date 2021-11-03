import { UnorderedList, Text, ListItem } from '@chakra-ui/react'

import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import Card from '../components/common/card'
import UnderlinedHeading from '../components/common/underlinedHeading'
import TextLink from '../components/common/textLink'
import FAQHeading from '../components/common/faqHeading'
import Divider from '../components/common/divider'

const PrivacyTextBlock = ({ children, ...props }) => (
  <Text marginBottom='1.5rem' {...props}>{children}</Text>
)

const Privacy = () => (
  <PageWrapper title='Privacy Policy'>
    <Section
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '3rem 7.5rem 6rem' }}
      backgroundColor='lightRock'
    >
      <UnderlinedHeading as='h1' text='Privacy Policy' align='center' />
      <Card shadowSz='lg' maxW='60rem'>
        <FAQHeading>TLDR</FAQHeading>
        <PrivacyTextBlock>
          We know privacy policies can be riddled with heavy language and legalese that’s difficult to parse. Our TLDR is that we will not share your personal information no matter what.
        </PrivacyTextBlock>
        <PrivacyTextBlock>
          <b>Here is a summary of the information we store:</b>
          <UnorderedList>
            <ListItem>
              Email for authentication.
            </ListItem>
            <ListItem>
              GitHub ID (if applicable).
            </ListItem>
            <ListItem>
              Donation amount (if applicable).
            </ListItem>
            <ListItem>
              Packages installed.
            </ListItem>
            <ListItem>
              Ads seen (if applicable).
            </ListItem>
          </UnorderedList>
        </PrivacyTextBlock>
        <PrivacyTextBlock>
          Please accept the following privacy policy as the official language of what’s stated above.
        </PrivacyTextBlock>
        <Divider />
        <FAQHeading>Privacy Policy</FAQHeading>
        <PrivacyTextBlock>
          Our Privacy Policy was posted on 20 November 2020 and last updated on 20 November 2020. It governs the privacy terms of our website, located at https://flossbank.com, and the tools we provide (the "Website" or the "Service").
        </PrivacyTextBlock>
        <Divider />
        <FAQHeading>Your Privacy</FAQHeading>
        <PrivacyTextBlock>
          Our Website follows all legal requirements to protect your privacy. Our Privacy Policy is a legal statement that explains how we may collect information from you, how we may share your information, and how you can limit our sharing of your information. You will see terms in our Privacy Policy that are capitalized. These terms have meanings as described in the Definitions section below.
        </PrivacyTextBlock>
        <Divider />
        <FAQHeading>Definitions</FAQHeading>
        <UnorderedList>
          <ListItem>
          Personal Data: Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).
          </ListItem>
          <ListItem>
          Usage Data: Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
          </ListItem>
          <ListItem>
          Cookies: Cookies are small pieces of data stored on a User's device.
          </ListItem>
          <ListItem>
          Data Controller: Data Controller means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.
          </ListItem>
          <ListItem>
          Data Processors (or Service Providers): Data Processor (or Service Provider) means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.
          </ListItem>
          <ListItem>
          Data Subject: Data Subject is any living individual who is the subject of Personal Data.
          </ListItem>
          <ListItem>
          User: The User is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.
          </ListItem>
        </UnorderedList>
        <Divider />
        <FAQHeading>Information Collection And Use</FAQHeading>
        <PrivacyTextBlock>
        We collect several different types of information for various purposes to provide and improve our Service to you.
        </PrivacyTextBlock>
        <PrivacyTextBlock>Types of Data Collected</PrivacyTextBlock>
        <UnorderedList>
          <ListItem>
          Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address and Usage Data.
We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the instructions provided in any email we send.
          </ListItem>
          <ListItem>
          Usage Data: We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data contains the names and versions of packages installed using the Flossbank CLI, the name and version of the package manager used to install the packages, the time of the installations, and which ads were seen during the installations (if any).
          </ListItem>
          <ListItem>
          Tracking &amp; Cookies Data: We use cookies to hold certain information during your session on our website.
Cookies are files with small amounts of data which may include a unique identifier. Cookies are sent to your browser from The Service and stored on your device.
Examples of Cookies we use: session cookies (we use these cookies to operate our Service) and preference cookies (we use these cookies to remember your preferences and various settings).
          </ListItem>
        </UnorderedList>
        <Divider />
        <FAQHeading>Use of Data</FAQHeading>
        <PrivacyTextBlock>We use the collected data for various purposes:</PrivacyTextBlock>
        <UnorderedList>
          <ListItem>
          To provide and maintain our Service
          </ListItem>
          <ListItem>To notify you about changes to our Service</ListItem>
          <ListItem>To allow you to participate in interactive features of our Service when you choose to do so</ListItem>
          <ListItem>To provide customer support</ListItem>
          <ListItem>To gather analysis or valuable information so that we can improve our Service</ListItem>
          <ListItem>To monitor the usage of our Service</ListItem>
          <ListItem>To detect, prevent and address technical issues</ListItem>
        </UnorderedList>
        <Divider />
        <FAQHeading>Retention of Data</FAQHeading>
        <PrivacyTextBlock>
        We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
        </PrivacyTextBlock>
        <PrivacyTextBlock>
        We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.
        </PrivacyTextBlock>
        <Divider />
        <FAQHeading>Transfer Of Data</FAQHeading>
        <PrivacyTextBlock>
        Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
        </PrivacyTextBlock>
        <PrivacyTextBlock>
        We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
        </PrivacyTextBlock>
        <PrivacyTextBlock>
        Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
        </PrivacyTextBlock>
        <Divider />
        <FAQHeading>Disclosure Of Data</FAQHeading>
        <UnorderedList>
          <ListItem>
          Business Transaction. If we are involved in a merger, acquisition or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.
          </ListItem>
          <ListItem>
          Disclosure for Law Enforcement. Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law.
          </ListItem>
        </UnorderedList>
        <Divider />
        <FAQHeading>Security Of Data</FAQHeading>
        <PrivacyTextBlock>
        The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </PrivacyTextBlock>
        <Divider />
        <FAQHeading>Legal Basis for Processing Personal Data Under General Data Protection Regulation (GDPR)</FAQHeading>
        <PrivacyTextBlock>
        If you are from the European Economic Area (EEA), Flossbank’s legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it.
        </PrivacyTextBlock>
        <PrivacyTextBlock>
        Flossbank may process your Personal Data because:
        </PrivacyTextBlock>
        <UnorderedList>
          <ListItem>
          We need to perform a contract with you
          </ListItem>
          <ListItem>
          You have given us permission to do so
          </ListItem>
          <ListItem>
          For payment processing purposes
          </ListItem>
          <ListItem>
          To comply with the law
          </ListItem>
        </UnorderedList>
        <Divider />
        <FAQHeading>Your Data Protection Rights Under General Data Protection Regulation (GDPR)</FAQHeading>
        <PrivacyTextBlock>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Flossbank aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</PrivacyTextBlock>
        <PrivacyTextBlock>If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.</PrivacyTextBlock>
        <PrivacyTextBlock>In certain circumstances, you have the following data protection rights:</PrivacyTextBlock>
        <UnorderedList>
          <ListItem>
          The right to access, update or to delete the information we have on you.
          </ListItem>
          <ListItem>
          The right of rectification. You have the right to have your information rectified if that information is inaccurate or incomplete.
          </ListItem>
          <ListItem>
          The right to object. You have the right to object to our processing of your Personal Data.
          </ListItem>
          <ListItem>
          The right of restriction. You have the right to request that we restrict the processing of your personal information.
          </ListItem>
          <ListItem>
          The right to data portability. You have the right to be provided with a copy of your Personal Data in a structured, machine-readable and commonly used format.
          </ListItem>
          <ListItem>
          The right to withdraw consent. You also have the right to withdraw your consent at any time where Flossbank relied on your consent to process your personal information.
          </ListItem>
        </UnorderedList><br />
        <PrivacyTextBlock>Please note that we may ask you to verify your identity before responding to such requests.</PrivacyTextBlock>
        <PrivacyTextBlock>You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).</PrivacyTextBlock>
        <Divider />
        <FAQHeading>"Do Not Sell My Personal Information" Notice for California consumers under California Consumer Privacy Act (CCPA)</FAQHeading>
        <PrivacyTextBlock>Under the CCPA, California consumers have the right to:</PrivacyTextBlock>
        <UnorderedList>
          <ListItem>
          Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
          </ListItem>
          <ListItem>
          Request that a business delete any personal data about the consumer that a business has collected.
          </ListItem>
          <ListItem>
          Request that a business that sells a consumer's personal data, not sell the consumer's personal data.
          </ListItem>
        </UnorderedList><br />
        <PrivacyTextBlock>If you make a request, we have 30 days to respond to you. If you would like to exercise any of these rights, please contact us.</PrivacyTextBlock>
        <Divider />
        <FAQHeading>Service Providers</FAQHeading>
        <PrivacyTextBlock>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</PrivacyTextBlock>
        <PrivacyTextBlock>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</PrivacyTextBlock>
        <PrivacyTextBlock fontWeight='600'>Analytics</PrivacyTextBlock>
        <PrivacyTextBlock>We may use third-party Service Providers to monitor and analyze the use of our Service.</PrivacyTextBlock>
        <UnorderedList>
          <ListItem>
          GoatCounter: GoatCounter is an open source web analytics platform available as a hosted service (free for non-commercial use) or self-hosted app. It aims to offer easy to use and meaningful privacy-friendly web analytics as an alternative to Google Analytics or Matomo.
For more information on the privacy practices of GoatCounter, please visit the GoatCounter Privacy &amp; Terms web page: <TextLink external href='https://www.goatcounter.com/help' text='https://www.goatcounter.com/help' />
          </ListItem>
        </UnorderedList><br />
        <PrivacyTextBlock fontWeight='600'>Payments</PrivacyTextBlock>
        <PrivacyTextBlock>We may provide paid products and/or services within the Service. In that case, we use third-party services for payment processing (e.g. payment processors).</PrivacyTextBlock>
        <PrivacyTextBlock>We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</PrivacyTextBlock>
        <PrivacyTextBlock>The payment processors we work with are:</PrivacyTextBlock>
        <UnorderedList>
          <ListItem>
          Stripe. Their Privacy Policy can be viewed at <TextLink external href='https://stripe.com/privacy' text='https://stripe.com/privacy' />
          </ListItem>
        </UnorderedList>
        <Divider />
        <FAQHeading>Links To Other Sites</FAQHeading>
        <PrivacyTextBlock>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</PrivacyTextBlock>
        <PrivacyTextBlock>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</PrivacyTextBlock>
        <Divider />
        <FAQHeading>Children's Privacy</FAQHeading>
        <PrivacyTextBlock>Our Service does not address anyone under the age of 18 ("Children").</PrivacyTextBlock>
        <PrivacyTextBlock>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</PrivacyTextBlock>
        <Divider />
        <FAQHeading>Changes To This Privacy Policy</FAQHeading>
        <PrivacyTextBlock>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</PrivacyTextBlock>
        <PrivacyTextBlock>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</PrivacyTextBlock>
        <PrivacyTextBlock>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</PrivacyTextBlock>
        <Divider />
        <FAQHeading>Contact Us</FAQHeading>
        <PrivacyTextBlock>If you have any questions about this Privacy Policy, please contact us by using the contact information we provided on our <TextLink href='/about' text='Contact page.' /></PrivacyTextBlock>
      </Card>
    </Section>
  </PageWrapper>
)

export default Privacy
