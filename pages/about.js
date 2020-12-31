import PageWrapper from '../components/common/pageWrapper'
import AboutUsSection from '../components/about/aboutUsSection'
import ContactSection from '../components/about/contactSection'

const About = () => (
  <PageWrapper
    title='About Us'
    description='Learn how Flossbank works to compensate Open Source maintainers for the value they contribute to the world.'
  >
    <AboutUsSection />
    <ContactSection hideHeading />
  </PageWrapper>
)

export default About
