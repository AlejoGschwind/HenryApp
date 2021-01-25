import { } from "../constants/usersContants";
import { GET_USERS, GET_INSTRUCTORS, GET_STUDENTS } from "../actions/usersActions";

const initialState = {
  users: [],
  intructor: [],
  student: []
 };

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return{
        ...state,
        users: action.payload
      }
    case GET_INSTRUCTORS:
      return {
        ...state,
        instructor: action.payload
      }
      case GET_STUDENTS:
        return{
          ...state,
          student: action.payload
        }
    default:
      return state;
  }
};

export default userReducers;