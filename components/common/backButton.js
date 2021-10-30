import {
  Flex,
  Text,
  Link
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

const BackButton = () => {
  const router = useRouter()

  return (
    <Link onClick={() => router.back()}>
      <Flex flexDirection='row' position='absolute' zIndex={1000} top='10rem' left='5rem' padding='1rem' cursor='pointer'>
        <ArrowBackIcon boxSize='1.5rem' />
        <Text paddingLeft='1rem'>Back</Text>
      </Flex>
    </Link>
  )
}

export default BackButton
