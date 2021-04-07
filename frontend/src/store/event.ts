import { State as RootState } from "./index"
import { Dispatch } from "redux"
import { Event } from "../models/event"

const API_ENDPOINT = "http://localhost:8080"

// State type
export interface EventState {
  events: Event[]

  // loading state
  isFetchingEvents: boolean
  isCreatingEvent: boolean

  // errors
  fetchEventsError?: string
  createEventError?: string
}

// Action Types
// these represent the redux actions that can be dispatched

export interface EventErrored {
  type: "EVENT_ERRORED"
  payload: {
    fetchEventsError?: any
    createEventError?: any
  }
}

export interface FetchEventsStarted {
  type: "FETCH_EVENTS_STARTED"
}
export interface EventsFetched {
  type: "EVENTS_FETCHED"
  payload: {
    events: Event[]
  }
}

export interface CreateEventStarted {
  type: "CREATE_EVENT_STARTED"
}
export interface EventCreated {
  type: "EVENT_CREATED"
  payload: Event
}

// EventAction type
// this is a type which can refer to any of the action types defined above
// this is useful for the reducer
export type EventAction =
  | EventErrored
  | EventsFetched
  | FetchEventsStarted
  | EventCreated
  | CreateEventStarted

// Default state
// when the app initializes, this will be the default redux state
const defaultState: EventState = {
  isFetchingEvents: false,
  isCreatingEvent: false,
  events: [],
}

// Reducer
const reducer = (state: EventState = defaultState, action: EventAction): EventState => {
  switch (action.type) {
    case "EVENT_ERRORED": {
      return {
        ...state,
        ...action.payload,
        isFetchingEvents: !action.payload.fetchEventsError,
        isCreatingEvent: !action.payload.createEventError,
      }
    }
    case "FETCH_EVENTS_STARTED": {
      return { ...state, isFetchingEvents: true, fetchEventsError: "" }
    }
    case "EVENTS_FETCHED": {
      return {
        ...state,
        isFetchingEvents: false,
        events: action.payload.events,
      }
    }
    case "CREATE_EVENT_STARTED": {
      return { ...state, isCreatingEvent: true, createEventError: "" }
    }
    case "EVENT_CREATED": {
      return {
        ...state,
        isCreatingEvent: false,
        events: [...state.events, action.payload],
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

export const fetchEvents = () => async (dispatch: Dispatch) => {
  dispatch({ type: "FETCH_EVENTS_STARTED" })
  try {
    const response = await fetch(`${API_ENDPOINT}/event`).then((r) => r.json())
    if (response && response.events) {
      dispatch({
        type: "EVENTS_FETCHED",
        payload: {
          events: response.events,
        },
      })
    } else {
      dispatch({
        type: "EVENT_ERRORED",
        payload: { fetchEventsError: response?.error?.toString?.() ?? "Error fetching events" },
      })
    }
  } catch (e) {
    dispatch({
      type: "EVENT_ERRORED",
      payload: { fetchEventsError: e?.toString?.() ?? "Error fetching events" },
    })
  }
}

export const createEvent = (e: Event) => async (dispatch: Dispatch) => {
  dispatch({ type: "CREATE_EVENT_STARTED" })
  try {
    const response = await fetch(`${API_ENDPOINT}/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    }).then((r) => r.json())
    if (response) {
      dispatch({
        type: "EVENT_CREATED",
        payload: response,
      })
      return response
    } else {
      dispatch({
        type: "EVENT_ERRORED",
        payload: { createEventError: response?.error?.toString?.() ?? "Error creating event" },
      })
    }
  } catch (e) {
    dispatch({
      type: "EVENT_ERRORED",
      payload: { createEventError: e?.toString?.() ?? "Error creating event" },
    })
  }
}

// Selectors
// these are functions to be used by useSelector in order to get data from redux
export const selectEvents = () => (state: RootState) => state.event.events ?? []
export const selectIsFetchingEvents = () => (state: RootState) => state.event.isFetchingEvents
export const selectIsCreatingEvent = () => (state: RootState) => state.event.isCreatingEvent
export const selectCreateEventError = () => (state: RootState) => state.event.createEventError
export const selectFetchEventsError = () => (state: RootState) => state.event.fetchEventsError
