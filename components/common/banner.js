import {
  Flex,
  Icon,
  CloseButton
} from '@chakra-ui/core'

const Banner = ({ icon, children, onCloseClick }) => {
  return (
    <Flex
      position='relative'
      color='ocean'
      width='100%'
      backgroundColor='lightPuddle'
      direction={{ base: 'column', md: 'row' }}
      align='center'
      justify='center'
      padding={{ base: '1rem 1.5rem', md: '1.5rem 3rem' }}
      margin='0 auto'
      fontWeight='500'
      borderColor='ocean'
      borderBottom='1px'
    >
      <Icon
        name={icon}
        size={{ base: '2rem', md: '3rem' }}
        marginRight={{ base: 0, md: '1.5rem' }}
        marginBottom={{ base: '1.5rem', md: 0 }}
      />
      {children}
      <CloseButton
        onClick={onCloseClick}
        color='currentColor'
        borderRadius='50%'
        aria-label='Dismiss message'
        position='absolute'
        top='.5rem'
        right='1rem'
        transition='all 200ms ease-in-out'
        _hover={{
          backgroundColor: 'ocean',
          color: '#fff'
        }}
      />
    </Flex>
  )
}

export default Banner
