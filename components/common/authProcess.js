import {
  Box,
  Text,
  Heading
} from '@chakra-ui/core'

import PropTypes from 'prop-types'

import Section from './section'
import TextLink from './textLink'
import GitHubLoginButton from './githubButton'

const AuthProcess = ({
  login,
  headingText,
  submitText,
  subHeadingText,
  otherProcessLinkText,
  otherProcessText,
  otherProcessHref
}) => {
  return (
    <Section
      backgroundColor='lightRock'
      minHeight={{ lg: '75vh' }}
      display='flex'
      alignItems='center'
      justifyContent='center'
      flex='1'
      flexDirection='column'
      paddingBottom={{ lg: '6rem !important' }}
    >
      <Heading
        as='h1'
        fontSize='1.5rem'
        fontWeight='400'
        marginBottom='3rem'
      >
        {headingText}
      </Heading>
      {subHeadingText && (
        <Text maxWidth='40rem' textAlign='center' marginBottom='2rem'>{subHeadingText}</Text>
      )}
      <Box
        width='100%'
        maxWidth='30rem'
        marginBottom='2rem'
      >
        <GitHubLoginButton
          text={submitText}
          login={login}
        />
      </Box>
      <Box
        width='100%'
        maxW='30rem'
        textAlign='center'
      >
        <Text>
          {otherProcessText} <TextLink href={otherProcessHref} text={otherProcessLinkText} />
        </Text>
      </Box>
    </Section>
  )
}

AuthProcess.propTypes = {
  login: PropTypes.bool.isRequired,
  // text for the submit button
  submitText: PropTypes.string.isRequired,
  subHeadingText: PropTypes.string,
  // text to go below the form
  otherProcessText: PropTypes.string.isRequired,
  otherProcessHref: PropTypes.string.isRequired,
  otherProcessLinkText: PropTypes.string.isRequired
}
export default AuthProcess
