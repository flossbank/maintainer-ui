import fetch from 'isomorphic-fetch'

export const login = async ({ email }) => {
  return fetchThenJson('api/maintainer/request-login', optionsWithPostBody({ email }))
}

export const completeGHLogin = async ({ code, state }) => {
  return fetchThenJson('api/user/github-auth', optionsWithPostBody({ code, state }))
}

export const completeLogin = async ({ email, token }) => {
  return fetchThenJson('api/maintainer/complete-login', optionsWithPostBody({ email, token }))
}

export const signup = async ({ email, referralCode }) => {
  return fetchThenJson('api/maintainer/register', optionsWithPostBody({ email, referralCode }))
}

export const verifyRegistration = async ({ email, response, token }) => {
  return fetchThenJson('api/maintainer/verify-registration', optionsWithPostBody({ email, token, recaptchaResponse: response }))
}

export const getOwnedPackages = async () => {
  return fetchThenJson('api/maintainer/owned-packages', optionsGetRequest())
}

export const proveNpmOwnership = async ({ token }) => {
  return fetchThenJson('api/maintainer/prove-npm-ownership', optionsWithPostBody({ token }))
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
  return fetchThenJson('api/support/feedback', optionsWithPostBody({ email, topic: `MAINTAINER- ${topic}`, name, body }))
}

export const resume = async () => {
  return fetchThenJson('api/maintainer/resume', optionsGetRequest())
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
