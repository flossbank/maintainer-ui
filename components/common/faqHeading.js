import { Heading } from '@chakra-ui/react'

// used for FAQ and How it Works page
const FAQHeading = ({ children, ...props }) => (
  <Heading
    as='h2'
    fontWeight='400'
    fontSize='1.5rem'
    color='boulder'
    marginBottom='.5em'
    {...props}
  >
    {children}
  </Heading>
)

export default FAQHeading
