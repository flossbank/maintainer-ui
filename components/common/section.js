import { Box } from '@chakra-ui/core'

const Section = ({ backgroundColor, children, ...props }) => (
  <Box
    as='section'
    backgroundColor={backgroundColor}
    padding={{ base: '3rem 1.5rem', sm: '5rem 3.75rem' }}
    color='#404042'
    {...props}
  >
    {children}
  </Box>
)

export default Section
