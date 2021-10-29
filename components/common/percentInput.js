import { useState } from 'react'
import { Flex, Input } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const PercentInput = ({ onChange, initialValue, id, ...props }) => {
  const [value, setValue] = useState(initialValue)

  const internalOnChange = (e) => {
    setValue(e.target.value)
    onChange({ e, id })
  }

  return (
    <Flex flexDirection='row' {...props} border='1px solid gray' borderRadius='4px'>
      <Input width='5rem' textAlign='right' border='none' variant='unstyled' onChange={internalOnChange} value={value} />
      <Flex flexDirection='column' justifyContent='center' paddingRight='1rem'>%</Flex>
    </Flex>
  )
}

PercentInput.propTypes = {
  initialValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  // ID is the id associated with this percentage change, as percent inputs
  // are usually used in a list of them
  id: PropTypes.string.isRequired
}

export default PercentInput
