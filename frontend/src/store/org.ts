import { User } from "../models/user"
import { State as RootState } from "./index"
import { Dispatch } from "redux"
import { Org } from "../models/org"

const API_ENDPOINT = "http://localhost:8080"

// State type
export interface OrgState {
  orgs: Org[]

  // loading state
  isFetchingOrgs: boolean

  // errors
  fetchOrgsError?: any
}

// Action Types
// these represent the redux actions that can be dispatched

export interface OrgErrored {
  type: "ORG_ERRORED"
  payload: {
    fetchOrgsError?: any
  }
}

export interface FetchOrgsStarted {
  type: "FETCH_ORGS_STARTED"
}
export interface OrgsFetched {
  type: "ORGS_FETCHED"
  payload: {
    orgs: Org[]
  }
}

// TodoAction type
// this is a type which can refer to any of the action types defined above
// this is useful for the reducer
export type OrgAction = OrgErrored | OrgsFetched | FetchOrgsStarted

// Default state
// when the app initializes, this will be the default redux state
const defaultState: OrgState = {
  isFetchingOrgs: false,
  orgs: [],
}

// Reducer
const reducer = (state: OrgState = defaultState, action: OrgAction): OrgState => {
  switch (action.type) {
    case "ORG_ERRORED": {
      return { ...state, ...action.payload, isFetchingOrgs: !action.payload.fetchOrgsError }
    }
    case "FETCH_ORGS_STARTED": {
      return { ...state, isFetchingOrgs: true }
    }
    case "ORGS_FETCHED": {
      return {
        ...state,
        isFetchingOrgs: false,
        orgs: action.payload.orgs,
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

export const fetchOrgs = () => async (dispatch: Dispatch) => {
  dispatch({ type: "FETCH_ORGS_STARTED" })
  try {
    const response = await fetch(`${API_ENDPOINT}/orgs`).then((r) => r.json())
    if (response && response.orgs) {
      dispatch({
        type: "ORGS_FETCHED",
        payload: {
          orgs: response.orgs,
        },
      })
    } else {
      dispatch({
        type: "ORG_ERRORED",
        payload: { fetchOrgsError: response?.error ?? "Error fetching orgs" },
      })
    }
  } catch (e) {
    dispatch({
      type: "ORG_ERRORED",
      payload: { fetchOrgsError: e ?? "Error fetching orgs" },
    })
  }
}

// Selectors
// these are functions to be used by useSelector in order to get data from redux
export const selectOrgs = () => (state: RootState) => state.org.orgs ?? []
export const selectIsFetchingOrgs = () => (state: RootState) => state.org.isFetchingOrgs
