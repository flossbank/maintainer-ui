import PageWrapper from '../components/common/pageWrapper'
import Card from '../components/common/card'
import UnderlinedHeading from '../components/common/underlinedHeading'
import SubHeading from '../components/common/subheading'

const Error404 = () => (
  <PageWrapper title='Error'>
    <Card margin={['2rem auto', '4rem auto']} as='section'>
      <UnderlinedHeading color='black' text='Uh oh' />
      <SubHeading>Looks like that's a 404 from us</SubHeading>
    </Card>
  </PageWrapper>
)

export default Error404
