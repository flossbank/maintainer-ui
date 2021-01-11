import got from 'got'

export default got.extend({
  prefixUrl: 'http://localhost:8081',
  throwHttpErrors: true,
  responseType: 'json',
  headers: {
    'content-type': 'application/json'
  }
})
