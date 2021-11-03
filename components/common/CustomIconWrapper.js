import { createIcon } from '@chakra-ui/icons'
import React from 'react'

import icons from '../../public/icons'

const CustomIconWrapper = ({ icon, ...props }) => {
  if (!icon || !icons[icon]) {
    return null
  }
  return React.createElement(createIcon(icons[icon]), props)
}

export default CustomIconWrapper
