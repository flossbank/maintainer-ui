import fetch from 'isomorphic-fetch'

export const login = async ({ email }) => {
  return fetchThenJson('api/maintainer/request-login', optionsWithPostBody({ email }))
}

export const completeGHLogin = async ({ code, state }) => {
  return fetchThenJson('api/maintainer/github-auth', optionsWithPostBody({ code, state }))
}

export const completeLogin = async ({ email, token }) => {
  return fetchThenJson('api/maintainer/complete-login', optionsWithPostBody({ email, token }))
}

export const signup = async ({ email, referralCode }) => {
  return fetchThenJson('api/maintainer/register', optionsWithPostBody({ email, referralCode }))
}

export const updateUsername = async ({ username }) => {
  return fetchThenJson('api/maintainer/update-username', optionsWithPutBody({ username }))
}

export const verifyRegistration = async ({ email, response, token }) => {
  return fetchThenJson('api/maintainer/verify-registration', optionsWithPostBody({ email, token, recaptchaResponse: response }))
}

export const getOwnedPackages = async () => {
  return fetchThenJson('api/maintainer/owned-packages', optionsGetRequest())
}

export const getPendingPayout = async () => {
  return fetchThenJson('api/maintainer/get-pending-payout', optionsGetRequest())
}

export const proveNpmOwnership = async ({ token }) => {
  return fetchThenJson('api/maintainer/prove-npm-ownership', optionsWithPostBody({ token }))
}

export const fetchPackagesByName = async ({ name }) => {
  return fetchThenJson(`api/package/search-by-name?name=${name}`, optionsGetRequest())
}

export const updateIlpPointer = async ({ pointer }) => {
  return fetchThenJson('api/maintainer/update-ilp-pointer', optionsWithPostBody({ ilpPointer: pointer }))
}

export const getPackage = async ({ packageId }) => {
  return fetchThenJson(`api/package/get?packageId=${packageId}`, optionsGetRequest())
}

export const getSupportingPackages = async ({ packageId }) => {
  return fetchThenJson(`api/package/get-supporting-companies?packageId=${packageId}`, optionsGetRequest)
}

export const logout = async () => {
  return fetchThenJson('api/maintainer/logout', optionsWithPostBody())
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

const headers = {
  'Content-Type': 'application/json',
  'x-requested-with': 'XmlHttpRequest'
}

const optionsWithPostBody = (body) => {
  return {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }
}

const optionsWithPutBody = (body) => {
  return {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  }
}

const optionsGetRequest = () => {
  return {
    method: 'GET'
  }
}
