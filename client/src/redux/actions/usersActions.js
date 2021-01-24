import axios from "axios";
export const GET_INSTRUCTORS = "GET_INSTRUCTORS";

export const getIntructors = () => {
    return function (dispatch) {
        axios.get("http://localhost:5000/users/instructors")
            .then(json => {
                dispatch({
                    type: GET_INSTRUCTORS,
                    payload: json
                });
            });
    };

};
