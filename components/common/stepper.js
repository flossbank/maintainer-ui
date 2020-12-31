import { Box, Text, PseudoBox, List, ListItem, Icon } from '@chakra-ui/core'
import PropTypes from 'prop-types'

const iconHeight = 2
const bgHeight = 0.25
const bgPos = (iconHeight - bgHeight) / 2

const barBg = {
  1: {
    bg: 'linear-gradient(to right, #BDC1C5 50%, #BDC1C5 100%)'
  },
  2: {
    bg: 'linear-gradient(to right, #3A68AA 50%, #BDC1C5 50%, #BDC1C5 100%)'
  },
  3: {
    bg: 'linear-gradient(to right, #3A68AA 50%, #3A68AA 100%)'
  }
}

const Step = ({ step, i, currentStep }) => (
  <ListItem textAlign='center' fontSize='0.875rem'>
    <>
      <Icon
        name={step.iconName}
        size={`${iconHeight}rem`}
        marginBottom='1rem'
      />
      <Text aria-current={i + 1 === currentStep ? 'step' : 'false'}>
        <Box
          as='span'
          display='block'
          textTransform='uppercase'
          fontWeight='bold'
        >
          {`Step ${i + 1}`}
        </Box>
        <Box as='span'>{step.title}</Box>
      </Text>
    </>
  </ListItem>
)

const Stepper = ({ steps, currentStep = 2 }) => (
  <PseudoBox
    display='flex'
    justifyItems='center'
    position='relative'
    width='100%'
    maxW='40rem'
    // this is the line that fills as the steps progress
    _after={{
      content: '""',
      position: 'absolute',
      left: `${iconHeight}rem`,
      top: `${bgPos}rem`,
      width: `calc(100% - ${iconHeight * 2}rem)`,
      height: `${bgHeight}rem`,
      background: barBg[currentStep].bg
    }}
  >
    <List
      as='ol'
      aria-label='Registration steps'
      display='flex'
      justifyContent='space-between'
      width='100%'
      position='relative'
      zIndex='1'
    >
      {steps.map((stepData, i) => (
        <Step key={i} step={stepData} i={i} currentStep={currentStep} />
      ))}
    </List>
  </PseudoBox>
)

Stepper.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired
}

export default Stepper
