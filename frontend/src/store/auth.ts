import { User } from "../models/user"
import { State as RootState } from "./index"
import { Dispatch } from "redux"

export const API_ENDPOINT = "https://cohort-unt.herokuapp.com"

// State type
export interface AuthState {
  token: string
  user?: User

  // loading state
  isSigningIn: boolean
  isSigningUp: boolean
  isRenewingToken: boolean
  isJoiningOrg: boolean
  isLeavingOrg: boolean
  isRsvpingEvent: boolean
  isUnrsvpingEvent: boolean

  // errors
  signinError?: string
  signupError?: string
  renewTokenError?: string
  joinOrgError?: string
  leaveOrgError?: string
  rsvpEventError?: string
  unrsvrpEventError?: string
}

// Action Types
// these represent the redux actions that can be dispatched

export interface AuthErrored {
  type: "AUTH_ERRORED"
  payload: {
    signinError?: string
    signupError?: string
    renewTokenError?: string
    joinOrgError?: string
    leaveOrgError?: string
    rsvpEventError?: string
    unrsvrpEventError?: string
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

export interface JoinOrgStarted {
  type: "JOIN_ORG_STARTED"
}
export interface OrgJoined {
  type: "ORG_JOINED"
  payload: {
    orgId: string
  }
}

export interface LeaveOrgStarted {
  type: "LEAVE_ORG_STARTED"
}
export interface OrgLeft {
  type: "ORG_LEFT"
  payload: {
    orgId: string
  }
}

export interface RsvpEventStarted {
  type: "RSVP_EVENT_STARTED"
}
export interface EventRsvped {
  type: "EVENT_RSVPED"
  payload: {
    eventId: string
  }
}

export interface UnrsvpEventStarted {
  type: "UNRSVP_EVENT_STARTED"
}
export interface EventUnrsvped {
  type: "EVENT_UNRSVPED"
  payload: {
    eventId: string
  }
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
  | OrgJoined
  | JoinOrgStarted
  | OrgLeft
  | LeaveOrgStarted
  | EventRsvped
  | RsvpEventStarted
  | EventUnrsvped
  | UnrsvpEventStarted

// Default state
// when the app initializes, this will be the default redux state
const defaultState: AuthState = {
  isSigningIn: false,
  isSigningUp: false,
  isRenewingToken: false,
  isJoiningOrg: false,
  isLeavingOrg: false,
  isRsvpingEvent: false,
  isUnrsvpingEvent: false,
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
        isJoiningOrg: !action.payload.joinOrgError,
        isLeavingOrg: !action.payload.leaveOrgError,
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
    case "JOIN_ORG_STARTED": {
      return { ...state, isJoiningOrg: true }
    }
    case "ORG_JOINED": {
      return {
        ...state,
        user: {
          ...(state.user ?? ({} as User)),
          orgs: [...(state.user?.orgs ?? []), action.payload.orgId],
        },
        isJoiningOrg: false,
      }
    }
    case "LEAVE_ORG_STARTED": {
      return { ...state, isLeavingOrg: true }
    }
    case "ORG_LEFT": {
      return {
        ...state,
        user: {
          ...(state.user ?? ({} as User)),
          orgs: (state.user?.orgs ?? []).filter((o) => o !== action.payload.orgId),
        },
        isLeavingOrg: false,
      }
    }
    case "RSVP_EVENT_STARTED": {
      return { ...state, isRsvpingEvent: true }
    }
    case "EVENT_RSVPED": {
      return {
        ...state,
        user: {
          ...(state.user ?? ({} as User)),
          rsvps: [...(state.user?.rsvps ?? []), action.payload.eventId],
        },
        isRsvpingEvent: false,
      }
    }
    case "UNRSVP_EVENT_STARTED": {
      return { ...state, isUnrsvpingEvent: true }
    }
    case "EVENT_UNRSVPED": {
      return {
        ...state,
        user: {
          ...(state.user ?? ({} as User)),
          rsvps: (state.user?.rsvps ?? []).filter((e) => e !== action.payload.eventId),
        },
        isUnrsvpingEvent: false,
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
  window.localStorage.removeItem("token")
  dispatch({ type: "SIGN_OUT" })
}

export const joinOrg = (orgId: string, userId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "JOIN_ORG_STARTED" })
    const response = await fetch(`${API_ENDPOINT}/org/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgId, userId }),
    }).then((r) => r.json())
    if (response && response.ok) {
      dispatch({
        type: "ORG_JOINED",
        payload: { orgId },
      })
      return response.ok
    } else {
      dispatch({
        type: "AUTH_ERRORED",
        payload: { joinOrgError: response?.error?.toString?.() ?? "Error joining org" },
      })
    }
  } catch (e) {
    dispatch({
      type: "AUTH_ERRORED",
      payload: { joinOrgError: e?.toString?.() ?? "Error joining org" },
    })
  }
}

export const leaveOrg = (orgId: string, userId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "LEAVE_ORG_STARTED" })
    const response = await fetch(`${API_ENDPOINT}/org/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgId, userId }),
    }).then((r) => r.json())
    if (response && response.ok) {
      dispatch({
        type: "ORG_LEFT",
        payload: { orgId },
      })
      return response.ok
    } else {
      dispatch({
        type: "AUTH_ERRORED",
        payload: { leaveOrgError: response?.error?.toString?.() ?? "Error leaving org" },
      })
    }
  } catch (e) {
    dispatch({
      type: "AUTH_ERRORED",
      payload: { leaveOrgError: e?.toString?.() ?? "Error leaving org" },
    })
  }
}

export const rsvpEvent = (eventId: string, userId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: "RSVP_EVENT_STARTED" })
  try {
    const response = await fetch(`${API_ENDPOINT}/event/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, userId }),
    }).then((r) => r.json())
    if (response && response.ok) {
      dispatch({
        type: "EVENT_RSVPED",
        payload: { eventId },
      })
      return response.ok
    } else {
      dispatch({
        type: "AUTH_ERRORED",
        payload: { rsvpEventError: response?.error?.toString?.() ?? "Error rsvping to event" },
      })
    }
  } catch (e) {
    dispatch({
      type: "AUTH_ERRORED",
      payload: { rsvpEventError: e?.toString?.() ?? "Error rsvping to event" },
    })
  }
}

export const unrsvpEvent = (eventId: string, userId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: "UNRSVP_EVENT_STARTED" })
  try {
    const response = await fetch(`${API_ENDPOINT}/event/unrsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, userId }),
    }).then((r) => r.json())
    if (response && response.ok) {
      dispatch({
        type: "EVENT_UNRSVPED",
        payload: { eventId },
      })
      return response.ok
    } else {
      dispatch({
        type: "AUTH_ERRORED",
        payload: { unrsvpEventError: response?.error?.toString?.() ?? "Error unrsvping to event" },
      })
    }
  } catch (e) {
    dispatch({
      type: "AUTH_ERRORED",
      payload: { unrsvpEventError: e?.toString?.() ?? "Error unrsvping to event" },
    })
  }
}

// Selectors
// these are functions to be used by useSelector in order to get data from redux
export const selectUser = () => (state: RootState) => state.auth.user
export const selectToken = () => (state: RootState) => state.auth.token

export const selectSignInError = () => (state: RootState) => state.auth.signinError
export const selectSignUpError = () => (state: RootState) => state.auth.signupError
