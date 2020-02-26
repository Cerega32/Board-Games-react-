const jwt = require('jsonwebtoken');
let decoded, name

if (!!localStorage.getItem("token")) {
  decoded = jwt.verify(localStorage.getItem("token"), "secret")
  name = decoded.name
}


const initialState = {
  token: localStorage.getItem("token"),
  user: name,
  isAuth: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  userData: {},
  signInOrUp: true,
  visibleModal: false
}

export const auth = (prevState = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SIGNIN_START':
      return { ...prevState, loading: true, error: false }
    case 'SIGNIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      localStorage.setItem("token", payload.token)
      return { ...prevState, loading: false, error: false, isAuth: true, user: payload.name }
    case 'SIGNIN_ERROR':
      return { ...prevState, loading: false, error: true }
    case 'SIGNOUT':
      localStorage.removeItem("token")
      return { ...prevState, isAuth: false }
    case "FETCH_PROFILE_REQUEST":
      return {
        ...prevState,
        userData: {},
        error: false,
        loading: true
      }
    case "FETCH_PROFILE_SUCCESS":
      return {
        ...prevState,
        userData: payload,
        error: false,
        loading: false
      }
    case "FETCH_PROFILE_FAILURE":
      return {
        ...prevState,
        userData: {},
        loading: false,
        error: action.payload
      }
    case 'MODAL_SHOW':
      return { ...prevState, visibleModal: true }
    case 'MODAL_HIDE':
      return { ...prevState, visibleModal: false }
    case 'MODAL_CHANGE':
      return { ...prevState, signInOrUp: !prevState.signInOrUp }

    default:
      return prevState
  }
}
