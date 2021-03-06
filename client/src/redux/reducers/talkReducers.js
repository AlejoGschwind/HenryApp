import {
  REQUEST_ACTION_TALKS,
  REQUEST_SUCCESS_ACTION_TALKS,
  REQUEST_FAILED_ACTION_TALKS,
  GET_ALL_TALKS,
  GET_TALK,
  CREATE_TALK,
  UPDATE_TALK,
  DELETE_TALK,
} from '../constants/talkConstants';

const initialState = {
  talk: {},
  talks: [],
  loadingTalks: false,
  error: null
};

const talkReducers = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_ACTION_TALKS:
      return {
        ...state,
        loadingTalks: true
      };

    case REQUEST_SUCCESS_ACTION_TALKS:
      return {
        ...state,
        loadingTalks: false,
        error: null
      };

    case REQUEST_FAILED_ACTION_TALKS:
      return {
        ...state,
        loadingTalks: false,
        error: action.error
      };

    case GET_ALL_TALKS:
      return {
        ...state,
        talks: action.talks
      };

    case GET_TALK:
      return {
        ...state,
        talk: action.talk
      };

    case CREATE_TALK:
      return {
        ...state,
        talks: [...state.talks, action.talk]
      };

    case UPDATE_TALK:
      return {
        ...state,
        talks: state.talks.map(t => {
          if (t._id === action.talk._id)
            return action.talk;
          return t;
        })
      };

    case DELETE_TALK:
      return {
        ...state,
        talks: state.talks.filter(t => {
          if (t._id === action.id)
            return false;
          return true;
        })
      };

    default:
      return state;
  }
};

export default talkReducers;
