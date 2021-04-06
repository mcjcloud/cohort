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
  isRenewingToken: boolean

  // errors
  signinError?: string
  signupError?: string
  renewTokenError?: string
}

// Action Types
// these represent the redux actions that can be dispatched

export interface AuthErrored {
  type: "AUTH_ERRORED"
  payload: {
    signinError?: string
    signupError?: string
    renewTokenError?: string
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

export interface RenewTokenStarted {
  type: "RENEW_TOKEN_STARTED"
}
export interface TokenRenewed {
  type: "TOKEN_RENEWED"
  payload: {
    token: string
    user: User
  }
}

export interface SignOut {
  type: "SIGN_OUT"
}

// TodoAction type
// this is a type which can refer to any of the action types defined above
// this is useful for the reducer
export type AuthAction =
  | AuthErrored
  | SignedIn
  | SigninStarted
  | SignedUp
  | SignupStarted
  | TokenRenewed
  | RenewTokenStarted
  | SignOut

// Default state
// when the app initializes, this will be the default redux state
const defaultState: AuthState = {
  isSigningIn: false,
  isSigningUp: false,
  isRenewingToken: false,
  token: "",
}

// Reducer
const reducer = (state: AuthState = defaultState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_ERRORED": {
      return {
        ...state,
        ...action.payload,
        isSigningIn: !action.payload.signinError,
        isSigningUp: !action.payload.signupError,
        isRenewingToken: !action.payload.renewTokenError,
      }
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
    case "RENEW_TOKEN_STARTED": {
      return { ...state, isRenewingToken: true }
    }
    case "TOKEN_RENEWED": {
      return {
        ...state,
        ...action.payload,
        isRenewingToken: false,
      }
    }
    case "SIGN_OUT": {
      return { ...state, token: "", user: undefined }
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
  try {
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
      window.localStorage.setItem("token", response.token)
      return response.user
    } else {
      dispatch({
        type: "AUTH_ERRORED",
        payload: { signinError: response?.error?.toString?.() ?? "Error signing in" },
      })
    }
  } catch (e) {
    dispatch({
      type: "AUTH_ERRORED",
      payload: { signinError: e?.toString?.() ?? "Error signing in" },
    })
  }
}

export const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => async (dispatch: Dispatch) => {
  try {
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
      window.localStorage.setItem("token", response.token)
      return response.user
    } else {
      dispatch({
        type: "AUTH_ERRORED",
        payload: { signupError: response?.error?.toString?.() ?? "Error signing up" },
      })
    }
  } catch (e) {
    dispatch({
      type: "AUTH_ERRORED",
      payload: { signupError: e?.toString?.() ?? "Error signing up" },
    })
  }
}

export const renew = (token: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "SIGNUP_STARTED" })
    const response = await fetch(`${API_ENDPOINT}/auth/renew`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).then((r) => r.json())
    if (response && response.user && response.token) {
      dispatch({
        type: "TOKEN_RENEWED",
        payload: {
          token: response.token,
          user: response.user,
        },
      })
      window.localStorage.setItem("token", response.token)
      return response.user
    } else {
      dispatch({
        type: "AUTH_ERRORED",
        payload: { signupError: response?.error?.toString?.() ?? "Error signing up" },
      })
    }
  } catch (e) {
    dispatch({
      type: "AUTH_ERRORED",
      payload: { signupError: e?.toString?.() ?? "Error signing up" },
    })
  }
}

export const signOut = () => async (dispatch: Dispatch) => {
  dispatch({ type: "SIGN_OUT" })
  window.localStorage.removeItem("token")
}

// Selectors
// these are functions to be used by useSelector in order to get data from redux
export const selectUser = () => (state: RootState) => state.auth.user
export const selectToken = () => (state: RootState) => state.auth.token

export const selectSignInError = () => (state: RootState) => state.auth.signinError
export const selectSignUpError = () => (state: RootState) => state.auth.signupError
