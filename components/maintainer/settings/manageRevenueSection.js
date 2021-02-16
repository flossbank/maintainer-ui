import {
  Text,
  Flex,
  Box
} from '@chakra-ui/core'

import SettingsCard from './settingsCard'

const ManageMaintainersSection = ({ user, pkg }) => {
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
              <Text>{m.username}</Text>
              <Text>{m.revenuePercent} %</Text>
            </Flex>
          ))}
        </Box>
      </SettingsCard>
    </>
  )
}
export default ManageMaintainersSection
