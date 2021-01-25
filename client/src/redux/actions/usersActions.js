import axios from "axios";
export const GET_INSTRUCTORS = "GET_INSTRUCTORS";
export const GET_USERS = "GET_USERS";
export const GET_STUDENTS = "GET_STUDENTS";
export const GET_USER = "GET_USER";

export const getUsers = () => {
    return function (dispatch) {
        axios.get("http://localhost:5000/users")
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res
            });
        });
    };
};

export const getIntructors = () => {
    return function (dispatch) {
        axios.get("http://localhost:5000/users/instructors")
            .then(res => {
                dispatch({
                    type: GET_INSTRUCTORS,
                    payload: res
                });
            });
    };

};

export const getStudents = () => {
    return function (dispatch) {
        axios.get("http://localhost:5000/users/students")
        .then(res => {
            dispatch({
                type: GET_STUDENTS,
                payload: res
            });
        });
    };
};

export const getOneUser = (id) => {
    return function (dispatch){
        axios.get(`http://localhost:5000/users/${id}`)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res
            });
        });
    };
};

