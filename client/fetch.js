import got from 'got'

export default got.extend({
  prefixUrl: process.env.NEXT_PUBLIC_PREVIEW ? process.env.STAGING_API_HOST : process.env.API_HOST,
  throwHttpErrors: true,
  responseType: 'json',
  headers: {
    'content-type': 'application/json'
  }
})
