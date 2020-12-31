import PageWrapper from '../components/common/pageWrapper'
import AuthProcess from '../components/common/authProcess'

const Login = () => (
  <PageWrapper title='Log In'>
    <AuthProcess
      login
      headingText='Log in to the Flossbank Maintainer Portal'
      submitText='Log in'
      otherProcessText="Don't have an account? "
      otherProcessHref='/signup'
      otherProcessLinkText='Sign up'
    />
  </PageWrapper>
)

export default Login
