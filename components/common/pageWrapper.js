import { PseudoBox, Flex, Box, Text } from '@chakra-ui/core'

import PropTypes from 'prop-types'
import FBHead from './head'
import Footer from './footer'
import Header from './header/header'
import LinkBtn from './linkBtn'

import styles from './skipLink.module.scss'
// TODO: add NProgress

import TextLink from '../common/textLink'

const SkipLink = () => (
  <LinkBtn href='#main-content' className={styles.skip}>
    Skip to main content
  </LinkBtn>
)

const PageWrapper = (props) => (
  <>
    <FBHead title={props.title} />
    <SkipLink />
    <Flex direction='column' minH='100vh'>
      <Header />
      <Box width='100%' height='auto' paddingTop='1rem' paddingBottom='1rem' textAlign='center' bg='tomato'>
        <Text margin='auto'>Flossbank is decomissioning... Please read more
          <TextLink
            text=' here'
            external
            href='https://medium.com/@joelwass/the-flossbank-attempt-de9d8ecc1dcf'
          />
          .
        </Text>
      </Box>
      <PseudoBox
        as='main'
        id='main-content'
        tabIndex='-1'
        // makes sure the main content fills out remaining space so the footer never floats up
        flex='1'
        display='flex'
        flexDirection='column'
        _focus={{
          outline: 'none !important'
        }}
      >
        {props.children}
      </PseudoBox>
      <Footer />
    </Flex>
  </>
)

PageWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default PageWrapper
