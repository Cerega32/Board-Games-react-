import BoardServices from "../services/board-services"

const boardService = new BoardServices()

const signUp = (email, password, name) => async dispatch => {
  dispatch(signInStart())
  try {
    let response = await boardService.signUp(email, password, name)
    response.json()
      .then(res => {
        const token = res.token
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, "secret")
        const name = decoded.name
        dispatch(signUpSuccess(token, name))
      });
  } catch (error) {
     dispatch(signInError(error))
  }
}



const signIn = (email, password) => async dispatch => {
  dispatch(signInStart())
  try {
    const response = await boardService.signIn(email, password)
    response.json()
      .then(res => {
        const token = res.token
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, "secret")
        const name = decoded.name
        dispatch(signInSuccess(token, name))
      })
  } catch (error) {
    dispatch(signInError(error))
  }
}

const signOut = () => dispatch => {
  dispatch(signOutStart())
}


const fetchProfile = () => async dispatch => {
  dispatch(profileRequested())
  try {
    const response = await boardService.getProfile()
    dispatch(profileLoaded(response.data))
  } catch (error) {
    dispatch(profileError(error))
  }
}


const signUpSuccess = (token, name) => {
  return {
    type: "SIGNUP_SUCCESS",
    payload: {token, name}
  }
}

const signInStart = () => {
  return {
    type: "SIGNIN_START"
  }
}

const signInSuccess = (token, name) => {
  return {
    type: "SIGNIN_SUCCESS",
    payload: {token, name}
  }
}

const signOutStart = () => {
  return {
    type: "SIGNOUT"
  }
}

const signInError = error => {
  return {
    type: "SIGNIN_ERROR",
    payload: error
  }
}

const profileRequested = () => {
  return {
    type: "FETCH_PROFILE_REQUEST"
  }
}

const profileLoaded = (profile) => {
  return {
    type: "FETCH_PROFILE_SUCCESS",
    payload: profile
  }
}

const profileError = error => {
  return {
    type: "FETCH_PROFILE_FAILURE",
    payload: error
  }
}

const showModal = () => {
  return {
    type: "MODAL_SHOW"
  }
};

const hideModal = () => {
  return {
    type: "MODAL_HIDE"
  }
}

const changeSign = () => {
  return {
    type: 'MODAL_CHANGE'
  }
}




export { signUp, signIn, signOut, fetchProfile, showModal, hideModal, changeSign }