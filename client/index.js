import fetch from 'isomorphic-fetch'

export const completeGHLogin = async ({ code, state }) => {
  return fetchThenJson('api/organization/github-auth', optionsWithPostBody({ code, state }))
}

export const fetchPackagesByName = async ({ name }) => {
  return fetchThenJson(`api/package/search-by-name?name=${name}`, optionsGetRequest())
}

export const getMaintainer = async ({ maintainerId }) => {
  return fetchThenJson(`api/maintainer/get?maintainerId=${maintainerId}`, optionsGetRequest())
}

export const getPackage = async ({ packageId }) => {
  return fetchThenJson(`api/package/get?packageId=${packageId}`, optionsGetRequest())
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

const optionsGetRequest = () => {
  return {
    method: 'GET'
  }
}
