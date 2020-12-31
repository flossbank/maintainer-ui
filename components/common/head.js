import Head from 'next/head'

// only put analytics on the page if we are in production and not a Next preview
const GOAT_COUNTER_ENABLE = !process.env.NEXT_PUBLIC_PREVIEW && process.env.GOAT_COUNTER_ENABLE
const defaultDescription = 'Flossbank enables companies to support the backbone of their technological systems through a simple monthly contribution.'
const defaultOGURL = 'https://enterprise.flossbank.com'
const defaultOGImage = 'https://enterprise.flossbank.com/images/ogImage.png'

const FBHead = ({ title, url, ogImage, description }) => (
  <Head>
    <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
    <meta
      name='description'
      content={description || defaultDescription}
    />
    <title>{(title && title + ' – Flossbank') || 'Flossbank'}</title>
    {GOAT_COUNTER_ENABLE && (
      <script data-goatcounter='https://flossbank.goatcounter.com/count' async src='//gc.zgo.at/count.js' />
    )}
    <link rel='icon' href='/favicon.ico' />
    <meta property='og:type' content='website' />
    <meta property='og:url' content={url || defaultOGURL} />
    <meta property='og:title' content={title || ''} />
    <meta
      property='og:description'
      content={description || defaultDescription}
    />
    <meta name='twitter:site' content={url || defaultOGURL} />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:text:title' content={title || 'Flossbank'} />
    <meta name='twitter:image' content={ogImage || defaultOGImage} />
    <meta property='og:image' content={ogImage || defaultOGImage} />
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='630' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
  </Head>
)

export default FBHead
