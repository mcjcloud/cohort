import { LaptopWindows } from "@material-ui/icons"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"

import auth, { AuthAction } from "./auth"
import org, { OrgAction } from "./org"

// Action Types
export type Action = AuthAction | OrgAction

const reducer = combineReducers({ auth, org })
export type State = ReturnType<typeof reducer>

const middlware = compose(
  applyMiddleware(thunk),
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
)

// create the redux store
export default createStore<State, any, any, any>(reducer, {}, middlware)
