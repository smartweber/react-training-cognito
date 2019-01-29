import * as orgApi from '../../auth/cognito/organizationApi'

export type Action = {
  type: 'TRACK_FETCHED' | 'CHANNEL_FETCHED',
  payload: {
    id: string
    data: any
  }
}

export function fetchChannel(channelId) {
  return (dispatch) => {
    orgApi.getChannel(channelId).then(res => {
      dispatch({
        type: 'CHANNEL_FETCHED',
        payload: res
      } as Action)
    })
  }
}

export function fetchTrack(trackId) {
  return (dispatch) => {
    orgApi.getTrack(trackId).then(res => {
      dispatch({
        type: 'TRACK_FETCHED',
        payload: res
      } as Action)
    })
  }
}