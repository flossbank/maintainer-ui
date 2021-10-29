// From https://chakra-ui.com/theme. we want to extend default theme but add colors + icons
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import CustomIcons from './icons'

const fontStack = `"Helvetica Neue", Helvetica, Frutiger, "Frutiger Linotype",
    Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad,
    "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva,
    Arial, sans-serif`

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em'
})

// aliases
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const overrides = {
  // initialColorMode: 'light',
  // useSystemColorMode: false,
  fonts: {
    body: fontStack,
    heading: fontStack,
    mono: 'Menlo, monospace'
  },
  colors: {
    ocean: '#2b67af',
    lake: '#529ed6',
    puddle: '#d7e6f6',
    lightPuddle: '#EBF3FB',
    rock: '#5f6771',
    boulder: '#404042',
    lightRock: '#f2f2f2'
  },
  icons: {
    ...CustomIcons
  }
}

const theme = extendTheme({ overrides })
export default theme
