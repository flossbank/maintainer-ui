import PageWrapper from '../components/common/pageWrapper'
import Section from '../components/common/section'
import UnderlinedHeading from '../components/common/underlinedHeading'

const About = () => (
  <PageWrapper
    title='Brand'
    description='This page outlines guidelines on using the Flossbank brand on external content'
  >
    <Section
      backgroundColor='lightRock'
    >
      <UnderlinedHeading
        text='Brand Guidelines'
        align={{ base: 'center', lg: 'left' }}
        marginBottom={{ base: '2rem', lg: 0 }}
      />

    </Section>
  </PageWrapper>
)

export default About
