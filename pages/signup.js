import PageWrapper from '../components/common/pageWrapper'
import AuthProcess from '../components/common/authProcess'
import { useAuth } from '../utils/useAuth'

const descriptionText = 'Get compensated for the Open Source packages being used by the world.'

const Signup = () => {
  const auth = useAuth()

  return (
    <PageWrapper
      title='Sign Up'
      description={descriptionText}
    >
      <AuthProcess
        process={auth.signup}
        login={false}
        headingText='Sign up for the Flossbank Maintainer Portal'
        subHeadingText={descriptionText}
        submitText='Sign up'
        otherProcessText='Already have an account?'
        successText='Success!'
        subSuccessText='Check your email for a verification link to finish signing up.'
        otherProcessHref='/login'
        otherProcessLinkText='Log in'
      />
    </PageWrapper>
  )
}

export default Signup
