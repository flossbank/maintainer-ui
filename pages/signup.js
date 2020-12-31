import PageWrapper from '../components/common/pageWrapper'
import AuthProcess from '../components/common/authProcess'

const descriptionText = 'Get compensated for the Open Source packages being used by the world.'

const Signup = () => (
  <PageWrapper
    title='Sign Up'
    description={descriptionText}
  >
    <AuthProcess
      login={false}
      headingText='Sign up for the Flossbank Maintainer Portal'
      subHeadingText={descriptionText}
      submitText='Sign up'
      otherProcessText='Already have an account?'
      otherProcessHref='/login'
      otherProcessLinkText='Log in'
    />
  </PageWrapper>
)

export default Signup
