import { List, ListItem, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { DuotoneStarIcon, SmileIcon, StackIcon, GivingHandIcon } from '../../common/icons'

const cardData = [
  {
    heading: 'No self promotion',
    icon: DuotoneStarIcon,
    text: 'No self promotion, no writing blog posts. Get compensated directly to your bank account if your code is used. That\'s it'
  },
  {
    heading: 'Easy',
    icon: SmileIcon,
    text:
      'Prove ownership of packages, choose your payout method, and get paid. As easy as that.'
  },
  {
    heading: 'Sustainable',
    icon: StackIcon,
    text: 'Each night, we\'ll use your registry username to ensure we are compensating you for every package you publish. Sign up once, never log in again.'
  },
  {
    heading: 'Equitable',
    icon: GivingHandIcon,
    text: 'If maintaining your packages is a team effort, manage distribution of package revenue through the Flossbank maintainer portal.'
  }
]

const Card = ({ icon, text, heading }) => (
  <ListItem
    padding='1.25rem 2rem'
    fontWeight='500'
    fontSize='0.875rem'
    lineHeight='1.3'
  >
    {React.createElement(icon, { boxSize: '1.5rem', marginBottom: '1rem' })}
    <Box
      as='h3'
      marginBottom='1rem'
      align='left'
      lineHeight='2rem'
      fontSize='24px'
      letterSpacing='1px'
      textTransform='none'
      fontWeight='400'
    >
      {heading}
    </Box>
    <Text fontSize='16px' fontWeight='400'>{text}</Text>
  </ListItem>
)

const WhyFBCards = () => (
  <List
    margin='auto'
    display='grid'
    paddingRight='0'
    gridGap='1.625rem'
    gridTemplateColumns={{
      base: 'minmax(12rem, 17rem)',
      sm: 'repeat(2, minmax(12rem, 30rem))'
    }}
    justifyContent='center'
    maxW='75rem'
    width='100%'
    marginBottom='3rem'
  >
    {cardData.map((card, i) => (
      <Card key={i} icon={card.icon} text={card.text} heading={card.heading} />
    ))}
  </List>
)

export default WhyFBCards
