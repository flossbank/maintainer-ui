import { Box } from '@chakra-ui/core'

const Divider = (props) => (
  <Box
    as='hr'
    borderColor='puddle'
    maxW='35rem'
    margin='1.5rem auto'
    {...props}
  />
)

export default Divider
