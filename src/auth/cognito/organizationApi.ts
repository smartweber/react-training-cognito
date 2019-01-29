import axios from 'axios'
import { CognitoAPI } from './cognitoApi'

const organizationEndpoint =
  'https://ue2yytl57i.execute-api.eu-west-1.amazonaws.com/dev/organizations'

const mainApi = 'https://ue2yytl57i.execute-api.eu-west-1.amazonaws.com/dev'

let userData: {
  cognito: CognitoAPI
  token: string
  orgId: string
  tubeId: string
} = {
  cognito: null,
  token: null,
  tubeId: null,
  orgId: null
}

type CreateOrganizationParams = {
  name: string
  email: string
  domain: string
}

const fetchResponse = res => {
  const json = res.json()
  if (res.status >= 200 && res.status < 300) {
    return json
  } else {
    return json.then(Promise.reject.bind(Promise))
  }
}

export function createOranization(params: CreateOrganizationParams) {
  return fetch(organizationEndpoint, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(fetchResponse)
}

export function getOrganization(id = 'org-dev-test4', tubeId = 'Sk0DkWraM') {
  userData.orgId = id
  userData.tubeId = tubeId

  return fetch(`${organizationEndpoint}?organizationId=${id}`)
    .then(fetchResponse)
    .then(
      res =>
        Object.keys(res).length === 0
          ? Promise.reject({ message: 'no organization found' })
          : res
    )
    .then(org => {
      userData.cognito = new CognitoAPI({
        userPoolId: org.userPoolId,
        clientId: org.userPoolClientId
      })
      return userData.cognito.sessionLogin()
    })
    .then(res => {
      userData.token = res.token
      return res
    })
}

export function getChannels() {
  return axios.get(`${mainApi}/query/channel`, {
    params: {
      tubeId: userData.tubeId
    },
    headers: { Authorization: 'Bearer ' + userData.token }
  })
  .then(res => {
    return res.data.Items
  })
}

export function getChannel(channelId: string) {
  return axios.get(`${mainApi}/channels/${channelId}`, {
    headers: { Authorization: 'Bearer ' + userData.token }
  })
  .then(res => {
    return axios.get(`${mainApi}/query/track`, {
      params: {
        tubeId: userData.tubeId,
        channelId
      },
      headers: { Authorization: 'Bearer ' + userData.token }
    }).then(resQuery => {
      return {
        ...res.data,
        tracks: resQuery.data.Items
      }
    })
  })
}

export function getTrack(trackId: string) {
  return axios.get(`${mainApi}/tracks/${trackId}`, {
    headers: { Authorization: 'Bearer ' + userData.token }
  })
  .then(res => {
    return axios.get(`${mainApi}/query/video`, {
      params: {
        tubeId: userData.tubeId,
        channelId: res.data.parent, // todo: check, since parent can be track!
        trackId
      },
      headers: { Authorization: 'Bearer ' + userData.token }
    }).then(resQuery => {
      return {
        ...res.data,
        videos: resQuery.data.Items
      }
    })
  })
}

export function signIn(username: string, password: string) {
  return userData.cognito.signIn(username, password)
}

export function signOut() {
  return userData.cognito.signOut()
}
