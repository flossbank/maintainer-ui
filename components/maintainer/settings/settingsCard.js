import Card from '../../common/card'

import { Heading } from '@chakra-ui/core'

const SettingsCard = ({ headingText, children }) => (
  <Card shadowSz='lg' w='100%' maxW='50rem' marginBottom='3rem'>
    <Heading
      textTransform='uppercase'
      textAlign={{ base: 'center', md: 'left' }}
      color='ocean'
      fontWeight='bold'
      fontSize='1rem'
      marginBottom='1.5rem'
    >
      {headingText}
    </Heading>
    {children}
  </Card>
)

export default SettingsCard
