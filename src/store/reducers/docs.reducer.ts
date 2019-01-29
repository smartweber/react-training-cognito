import { Action } from '../actions'

const docsReducer = function(state = {}, action: Action) {
  switch (action.type) {
    case 'CHANNEL_FETCHED':
    case 'TRACK_FETCHED': {
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          fetching: false
        }
      }
    }
    default: {
      return state
    }
  }
}

export default docsReducer
