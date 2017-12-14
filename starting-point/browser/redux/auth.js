import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
const SIGN_UP_USER = 'SIGN_UP_USER';
/* ------------     ACTION CREATORS      ------------------ */

const setCurrentUser  = user => ({ type: SET_CURRENT_USER, user });

const removeCurrentUser  = () => ({ type: REMOVE_CURRENT_USER });

const signUpUser = user => ({ type: SIGN_UP, user });
/* ------------          REDUCER         ------------------ */

export default function reducer (currentUser = {}, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      return Object.assign({}, currentUser, action.user);
    case REMOVE_CURRENT_USER:
      return {};
    case SIGN_UP_USER:
      return action.user;
    default:
      return currentUser;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const login = credentials => dispatch => {
  console.log("rHittin that tunk")
  axios.put("/auth/local/login", credentials)
       .then(res => {
         dispatch(setCurrentUser(res.data))})
       .catch(err => console.error(`Logging in with ${credentials.email} and ${credentials.password} was unsuccesful`, err));
};
export const logout = () => dispatch => {
  axios.delete("/auth/local/logout")
      .then(res => dispatch(removeCurrentUser(res.data)))
    .catch(console.error);
};

export const signup = credentials => dispatch => {
  axios.post("/auth/local/signup", credentials)
       .then(res => dispatch(setCurrentUser(res.data)))
       .catch(err => console.error(`Signing up with ${credentials.email} and ${credentials.password} was unsuccesful`, err));
};
