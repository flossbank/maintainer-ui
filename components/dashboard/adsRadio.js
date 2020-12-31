import React from 'react'
import { Button } from '@chakra-ui/core'

const AdsRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props
  return (
    <Button
      ref={ref}
      margin='0 !important'
      backgroundColor={isChecked ? 'ocean' : 'lightPuddle'}
      color={isChecked ? 'white' : 'ocean'}
      _hover={{
        backgroundColor: 'boulder',
        color: 'white'
      }}
      _focus={{
        outlineOffset: '1px',
        outlineColor: 'ocean'
      }}
      aria-checked={isChecked}
      role='radio'
      isDisabled={isDisabled}
      {...rest}
    />
  )
})

export default AdsRadio
