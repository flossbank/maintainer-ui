import {
  Text,
  Flex,
  Box,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'

import SettingsCard from './settingsCard'
import PercentInput from '../../common/percentInput'
import ErrorMessage from '../../common/errorMessage'
import FBButton from '../../common/fbButton'
import { updatePackagePercentages } from '../../../client/index'

const ManageMaintainersSection = ({ user, pkg }) => {
  const [valuesChanged, setValuesChanged] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState('')
  const [maintainerList, setMaintainerList] = useState(pkg.maintainers || [])
  const toast = useToast()

  const percentChange = ({ e, id }) => {
    setValuesChanged(true)
    setUpdateError('')
    const newPercent = e.target.value
    const newMaintainerList = maintainerList.map((m) => {
      if (m.userId === id) return { ...m, revenuePercent: parseInt(newPercent) }
      return { ...m }
    })
    setMaintainerList(newMaintainerList)
  }

  const submitNewPercentages = async () => {
    if (maintainerList.reduce((acc, m) => acc + m.revenuePercent, 0) !== 100) {
      setUpdateError('Percentages must add up to 100')
      return
    }
    setUpdateError('')
    setIsUpdating(true)
    try {
      await updatePackagePercentages({ packageId: pkg.id, maintainers: maintainerList })
      toast({
        title: 'Success',
        description: 'Revenue percentages updated. These changes will be reflected in the next payout.',
        status: 'success',
        duration: 10000,
        isClosable: true
      })
      setValuesChanged(false)
    } catch (e) {
      setUpdateError(e.message)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      <SettingsCard headingText={`${pkg.name} revenue splits`}>
        <Box>
          <Flex marginBottom='1.5rem' flexDirection='row' fontWeight='bold' justifyContent='space-between'>
            <Text>Username</Text>
            <Text>Revenue Percent</Text>
          </Flex>
          {pkg.maintainers && pkg.maintainers.map((m) => (
            <Flex flexDirection='row' justifyContent='space-between' marginBottom='1rem' key={m.username}>
              <Flex flexDirection='column' justifyContent='center'>{m.username}</Flex>
              <PercentInput initialValue={m.revenuePercent} onChange={percentChange} id={m.userId} />
            </Flex>
          ))}
          <Box marginTop='2rem'>
            {updateError && (
              <ErrorMessage msg={updateError} />
            )}
            <FBButton
              isLoading={isUpdating}
              disabled={!valuesChanged}
              float='right'
              onClick={submitNewPercentages}
            >
              Update
            </FBButton>
          </Box>
        </Box>
      </SettingsCard>
    </>
  )
}
export default ManageMaintainersSection
