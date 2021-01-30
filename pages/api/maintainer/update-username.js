import got from '../../../client/fetch'

export default async (req, reply) => {
  const { username } = req.body
  try {
    const reqHeaders = {
      'x-requested-with': req.headers['x-requested-with'],
      cookie: req.headers.cookie
    }

    const response = await got.put('maintainer/update-username', {
      json: { username },
      headers: reqHeaders
    })
    const headers = response.headers
    if (headers && headers['set-cookie']) {
      reply.setHeader('set-cookie', headers['set-cookie'])
    }
    reply.status(response.statusCode).json(response.body)
  } catch (e) {
    console.error({ username, message: e.response.body, statusCode: e.response.statusCode })
    reply.status(e.response.statusCode || 500).send(e.response.body)
  }
}
