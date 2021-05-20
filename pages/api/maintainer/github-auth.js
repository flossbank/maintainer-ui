import got from '../../../client/fetch'

export default async (req, reply) => {
  const { code, state } = req.body
  try {
    const reqHeaders = {
      'x-requested-with': req.headers['x-requested-with'],
      cookie: req.headers.cookie
    }
    const response = await got.post('user/github-auth', {
      json: { code, state },
      headers: reqHeaders
    })
    const headers = response.headers
    if (headers && headers['set-cookie']) {
      reply.setHeader('set-cookie', headers['set-cookie'])
    }
    reply.status(response.statusCode).json(response.body)
  } catch (e) {
    console.error({ code, state, message: e.response.body, statusCode: e.response.statusCode })
    reply.status(e.response.statusCode || 500).send(e.response.body)
  }
}
