import { Alert, AlertIcon } from '@chakra-ui/core'

const ErrorMessage = ({ msg, iconSize, children, ...props }) => (
  <Alert
    status='error'
    marginBottom='1rem'
    backgroundColor='#ffe5e5'
    fontWeight='500'
    color='#b9423a'
    {...props}
    display='flex'
    flexDirection={{ base: 'column', md: 'row' }}
    alignItems='center'
    justifyContent='center'
  >
    <AlertIcon
      color='#b9423a'
      size={iconSize || '1.5rem'}
      marginBottom={{ base: '1rem', md: 0 }}
    />
    <span>
      {msg}
      {children}
    </span>
  </Alert>
)

export default ErrorMessage
