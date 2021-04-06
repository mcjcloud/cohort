import { User } from "../models/user"
import { State as RootState } from "./index"
import { Dispatch } from "redux"

const API_ENDPOINT = "http://localhost:8080"

// State type
export interface AuthState {
  token: string
  user?: User

  // loading state
  isSigningIn: boolean
  isSigningUp: boolean

  // errors
  signinError?: any
  signupError?: any
}

// Action Types
// these represent the redux actions that can be dispatched

export interface AuthErrored {
  type: "AUTH_ERRORED"
  payload: {
    signinError?: any
    signupError?: any
  }
}

export interface SigninStarted {
  type: "SIGNIN_STARTED"
}
export interface SignedIn {
  type: "SIGNED_IN"
  payload: {
    token: string
    user: User
  }
}

export interface SignupStarted {
  type: "SIGNUP_STARTED"
}
export interface SignedUp {
  type: "SIGNED_UP"
  payload: {
    token: string
    user: User
  }
}

// TodoAction type
// this is a type which can refer to any of the action types defined above
// this is useful for the reducer
export type AuthAction = AuthErrored | SignedIn | SigninStarted | SignedUp | SignupStarted

// Default state
// when the app initializes, this will be the default redux state
const defaultState: AuthState = {
  isSigningIn: false,
  isSigningUp: false,
  token: "",
}

// Reducer
const reducer = (state: AuthState = defaultState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_ERRORED": {
      return { ...state, ...action.payload }
    }
    case "SIGNIN_STARTED": {
      return { ...state, isSigningIn: true }
    }
    case "SIGNED_IN": {
      return {
        ...state,
        ...action.payload,
        isSigningIn: false,
      }
    }
    case "SIGNUP_STARTED": {
      return { ...state, isSigningUp: true }
    }
    case "SIGNED_UP": {
      return {
        ...state,
        ...action.payload,
        isSigningUp: false,
      }
    }
    default: {
      return state
    }
  }
}
export default reducer

// Actions
// these are dispatchable functions which update the redux state

export const signIn = (email: string, password: string) => async (dispatch: Dispatch) => {
  dispatch({ type: "SIGNIN_STARTED" })
  const response = await fetch(`${API_ENDPOINT}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((r) => r.json())
  if (response && response.user && response.token) {
    dispatch({
      type: "SIGNED_IN",
      payload: {
        token: response.token,
        user: response.user,
      },
    })
    return response.user
  } else {
    dispatch({
      type: "AUTH_ERRORED",
      payload: { signinError: response?.error ?? "Error signing in" },
    })
  }
}

export const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => async (dispatch: Dispatch) => {
  dispatch({ type: "SIGNUP_STARTED" })
  const response = await fetch(`${API_ENDPOINT}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  }).then((r) => r.json())
  if (response && response.user && response.token) {
    dispatch({
      type: "SIGNED_UP",
      payload: {
        token: response.token,
        user: response.user,
      },
    })
    return response.user
  } else {
    dispatch({
      type: "AUTH_ERRORED",
      payload: { signupError: response?.error ?? "Error signing up" },
    })
  }
}

// Selectors
// these are functions to be used by useSelector in order to get data from redux
export const selectUser = () => (state: RootState) => state.auth.user
export const selectToken = () => (state: RootState) => state.auth.token
