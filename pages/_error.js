import PageWrapper from '../components/common/pageWrapper'
import Card from '../components/common/card'
import UnderlinedHeading from '../components/common/underlinedHeading'
import SubHeading from '../components/common/subheading'

const CustomError = () => (
  <PageWrapper title='Error'>
    <Card margin={['2rem auto', '4rem auto']} as='section'>
      <UnderlinedHeading color='black' text='Uh oh' />
      <SubHeading>An error occurred :/</SubHeading>
    </Card>
  </PageWrapper>
)

export default CustomError
