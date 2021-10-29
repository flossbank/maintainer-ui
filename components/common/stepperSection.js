import { Flex } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import Stepper from '../common/stepper'

const StepperSection = ({ steps, currentStep }) => (
  <Flex
    align='center'
    justify='center'
    padding='3.75rem 1.5rem'
    backgroundColor='lightPuddle'
    marginBottom='3rem'
  >
    <Stepper steps={steps} currentStep={currentStep} />
  </Flex>
)

StepperSection.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired
}

export default StepperSection
