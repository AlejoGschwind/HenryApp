import { } from "../constants/usersContants";
import { GET_INSTRUCTORS } from "../actions/usersActions";

const initialState = {
  intructor: [],
  student: [],
  guest: [],
  banned: []
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_INSTRUCTORS:
      return {
        ...state,
        instructor: action.payload
      };


    default:
      return state;
  }
};

export default userReducers;