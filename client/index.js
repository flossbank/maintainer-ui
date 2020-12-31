import fetch from 'isomorphic-fetch'

export const completeGHLogin = async ({ code, state }) => {
  return fetchThenJson('api/organization/github-auth', optionsWithPostBody({ code, state }))
}

export const logout = async () => {
  return fetchThenJson('api/organization/logout', optionsWithPostBody())
}

export const sendSupportFeedback = async ({ email, name, topic, body }) => {
  return fetchThenJson('api/support/feedback', optionsWithPostBody({ email, topic: `ENTERPRISE- ${topic}`, name, body }))
}

export const resume = async () => {
  return fetchThenJson('api/organization/resume', optionsGetRequest())
}

export const gitHubListOrgs = async () => {
  return fetchThenJson('api/organization/github-list-orgs', optionsWithPostBody({}))
}

export const chooseOrg = async ({ name, host }) => {
  return fetchThenJson('api/organization/choose', optionsWithPostBody({ name, host }))
}

const fetchThenJson = (url, options) => fetch(`${window.location.origin}/${url}`, options)
  .then(res => {
    if (!res.ok) {
      throw res
    }
    return res.json()
  })

const optionsWithPostBody = (body) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-requested-with': 'XmlHttpRequest'
    },
    body: JSON.stringify(body)
  }
}

const optionsWithPutBody = (body) => {
  return {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-requested-with': 'XmlHttpRequest'
    },
    body: JSON.stringify(body)
  }
}

const optionsDeleteRequest = () => {
  return {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-requested-with': 'XmlHttpRequest'
    }
  }
}

const optionsGetRequest = () => {
  return {
    method: 'GET'
  }
}
