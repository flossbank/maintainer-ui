import React from 'react'
import { useAuth } from '../../utils/useAuth'

import { Flex, List, ListItem, Text, Box } from '@chakra-ui/core'

import TextLink from './textLink'
import styles from './footer.module.scss'

const loggedOutTopLinks = [
  {
    url: '/brand-guidelines',
    text: 'Brand Guidelines'
  },
  {
    url: '/wallet-overview',
    text: 'Wallet Overview'
  }
]

const loggedOutBottomLinks = [
  {
    url: '/about',
    text: 'About Us'
  },
  {
    url: '/faq',
    text: 'FAQs'
  },
  {
    url: '/how-it-works',
    text: 'How It Works'
  },
  {
    url: '/contact',
    text: 'Contact Us'
  }
]

const loggedInTopLinks = [
  {
    url: '/contact',
    text: 'Contact Us'
  },
  {
    url: '/brand-guidelines',
    text: 'Brand Guidelines'
  },
  {
    url: '/wallet-overview',
    text: 'Wallet Overview'
  }
]

const loggedInBottomLinks = [
  {
    url: '/about',
    text: 'About Us'
  },
  {
    url: '/faq',
    text: 'FAQs'
  },
  {
    url: '/how-it-works',
    text: 'How It Works'
  }
]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const user = useAuth().user
  const topLinks = user ? loggedInTopLinks : loggedOutTopLinks
  const bottomLinks = user ? loggedInBottomLinks : loggedOutBottomLinks

  return (
    <Box
      as='footer'
      backgroundColor='boulder'
      flexDirection='column'
      justify='space-around'
      padding={{ base: '3rem 1.5rem', md: '5rem 3.75rem' }}
      color='white'
    >
      <Flex flexDirection='row' justify='space-around' marginBottom='1rem'>
        <List className={styles.list}>
          {topLinks.map((link, i) => (
            <ListItem key={i}>
              <TextLink href={link.url} text={link.text} color='white' padding='.25rem' />
            </ListItem>
          ))}
        </List>
      </Flex>
      <Flex flexDirection='row' justify='space-around' marginBottom='1.5rem'>
        <List className={styles.list}>
          {bottomLinks.map((link, i) => (
            <ListItem key={i}>
              <TextLink href={link.url} text={link.text} color='white' padding='.25rem' />
            </ListItem>
          ))}
        </List>
      </Flex>
      <Text textAlign='center'>
        &copy; {currentYear} Flossbank. All rights reserved.
      </Text>
    </Box>
  )
}

export default Footer
