import {
  FormControl,
  FormLabel
} from '@chakra-ui/react'

const FBFormControl = ({ labelText, id, required, children, ...props }) => (
  <FormControl marginBottom='1.5rem' isRequired={required} {...props}>
    <FormLabel
      htmlFor={id}
      marginBottom='.5rem'
      fontWeight='400 !important'
      fontSize='1rem'
    >
      {labelText}
    </FormLabel>
    {children}
  </FormControl>
)

export default FBFormControl
