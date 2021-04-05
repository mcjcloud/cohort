import { State as RootState } from "./index"
import { Dispatch } from "redux"
import { Org } from "../models/org"

const API_ENDPOINT = "http://localhost:8080"

// State type
export interface OrgState {
  orgs: Org[]

  // loading state
  isFetchingOrgs: boolean
  isCreatingOrg: boolean

  // errors
  fetchOrgsError?: any
  createOrgError?: any
}

// Action Types
// these represent the redux actions that can be dispatched

export interface OrgErrored {
  type: "ORG_ERRORED"
  payload: {
    fetchOrgsError?: any
    createOrgError?: any
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

export interface CreateOrgStarted {
  type: "CREATE_ORG_STARTED"
}
export interface OrgCreated {
  type: "ORG_CREATED"
  payload: Org
}

// OrgAction type
// this is a type which can refer to any of the action types defined above
// this is useful for the reducer
export type OrgAction = OrgErrored | OrgsFetched | FetchOrgsStarted | OrgCreated | CreateOrgStarted

// Default state
// when the app initializes, this will be the default redux state
const defaultState: OrgState = {
  isFetchingOrgs: false,
  isCreatingOrg: false,
  orgs: [],
}

// Reducer
const reducer = (state: OrgState = defaultState, action: OrgAction): OrgState => {
  switch (action.type) {
    case "ORG_ERRORED": {
      return {
        ...state,
        ...action.payload,
        isFetchingOrgs: !action.payload.fetchOrgsError,
        isCreatingOrg: !action.payload.createOrgError,
      }
    }
    case "FETCH_ORGS_STARTED": {
      return { ...state, isFetchingOrgs: true, fetchOrgsError: null }
    }
    case "ORGS_FETCHED": {
      return {
        ...state,
        isFetchingOrgs: false,
        orgs: action.payload.orgs,
      }
    }
    case "CREATE_ORG_STARTED": {
      return { ...state, isCreatingOrg: true, createOrgError: null }
    }
    case "ORG_CREATED": {
      return {
        ...state,
        isCreatingOrg: false,
        orgs: [...state.orgs, action.payload],
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
    const response = await fetch(`${API_ENDPOINT}/org`).then((r) => r.json())
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

export const createOrg = (org: Org) => async (dispatch: Dispatch) => {
  dispatch({ type: "CREATE_ORG_STARTED" })
  try {
    const response = await fetch(`${API_ENDPOINT}/org`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(org),
    }).then((r) => r.json())
    if (response) {
      dispatch({
        type: "ORG_CREATED",
        payload: response,
      })
      return response
    } else {
      dispatch({
        type: "ORG_ERRORED",
        payload: { createOrgError: response?.error?.toString?.() ?? "Error creating org" },
      })
    }
  } catch (e) {
    dispatch({
      type: "ORG_ERRORED",
      payload: { createOrgError: e.toString?.() ?? "Error creating org" },
    })
  }
}

// Selectors
// these are functions to be used by useSelector in order to get data from redux
export const selectIsFetchingOrgs = () => (state: RootState) => state.org.isFetchingOrgs
export const selectIsCreatingOrg = () => (state: RootState) => state.org.isCreatingOrg

export const selectOrgs = () => (state: RootState) => state.org.orgs ?? []

export const selectCreateOrgError = () => (state: RootState) => state.org.createOrgError
