import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"

import auth, { AuthAction } from "./auth"

// Action Types
export type Action = AuthAction

const reducer = combineReducers({ auth })
export type State = ReturnType<typeof reducer>

// create the redux store
export default createStore<State, any, any, any>(reducer, {}, applyMiddleware(thunk))
