import { Input } from '@chakra-ui/react'

const FBTextInput = ({ id, type, register, ...props }) => (
  <Input
    id={id}
    type={type}
    backgroundColor='lightRock'
    borderRadius='10px'
    ref={register}
    {...props}
  />
)

export default FBTextInput
