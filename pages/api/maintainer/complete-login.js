import got from '../../../client/fetch'

export default async (req, reply) => {
  const { email, token } = req.body
  try {
    const reqHeaders = {
      'x-requested-with': req.headers['x-requested-with'],
      cookie: req.headers.cookie
    }
    // This is correct to be "user" endpoint, as maintainers are users under the hood so
    // we will call user/complete-login to complete the login of this user (maintainer)
    const response = await got.post('user/complete-login', {
      json: { email, token },
      headers: reqHeaders
    })
    const headers = response.headers
    if (headers && headers['set-cookie']) {
      reply.setHeader('set-cookie', headers['set-cookie'])
    }
    reply.status(response.statusCode).json(response.body)
  } catch (e) {
    console.error({ email, token, message: e.response.body, statusCode: e.response.statusCode })
    reply.status(e.response.statusCode || 500).send(e.response.body)
  }
}
