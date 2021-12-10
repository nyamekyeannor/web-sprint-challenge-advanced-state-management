import axios from "axios";

export const SMURF_START = "SMURF_START";
export const SMURF_SUCCESS = "SMURF_SUCCESS";
export const ADD_SMURF = "ADD_SMURF";
export const SMURF_FAIL = "SMURF_FAIL";

export const fetchSmurfs = () => (dispatch) => {
  dispatch({ type: SMURF_START });
  axios
    .get("http://localhost:3333/smurfs")
    .then((res) => {
      dispatch({ type: SMURF_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SMURF_FAIL, payload: err });
    });
};

export const addSmurf = (smurf) => (dispatch) => {
  if (smurf.name === "" || smurf.nickname === "" || smurf.position === "") {
    dispatch({
      type: SMURF_FAIL,
      payload: "Name, Position and Nickname are required fields.",
    });
    return;
  }

  dispatch({ type: SMURF_START });
  axios
    .post("http://localhost:3333/smurfs", smurf)
    .then((res) => {
      dispatch({ type: ADD_SMURF, payload: smurf });
    })
    .catch((err) => {
      dispatch({ type: SMURF_FAIL, payload: err.response.data.Error });
    });
};

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.
