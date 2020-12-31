import {
  Button
} from '@chakra-ui/core'

const FBButton = (props) => {
  return (
    <Button
      fontSize='14px'
      width={['auto', '30%']}
      borderRadius='8px'
      {...props}
    >{props.children}
    </Button>
  )
}

export default FBButton
