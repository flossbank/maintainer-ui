import { List, ListItem, Icon, Box, Text } from '@chakra-ui/core'

const cardData = [
  {
    heading: 'No self promotion',
    icon: 'duotoneStar',
    text: 'No self promotion, no writing blog posts. Get compensated directly to your bank account if your code is used. That\'s it'
  },
  {
    heading: 'Easy',
    icon: 'smile',
    text:
      'Prove ownership of packages, choose your payout method, and get paid. As easy as that.'
  },
  {
    heading: 'Sustainable',
    icon: 'stack',
    text: 'Each night, we\'ll use your registry username to ensure we are compensating you for every package you publish. Sign up once, never log in again.'
  },
  {
    heading: 'Equitable',
    icon: 'givingHand',
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
    <Icon name={icon} size='1.5rem' margin='0rem 0 1rem 0' />
    <Box
      as='h3'
      marginBottom='1rem'
      align='left'
      lineGap='1'
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
