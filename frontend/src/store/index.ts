import { LaptopWindows } from "@material-ui/icons"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"

import auth, { AuthAction } from "./auth"
import org, { OrgAction } from "./org"
import event, { EventAction } from "./event"

// Action Types
export type Action = AuthAction | OrgAction | EventAction

const reducer = combineReducers({ auth, org, event })
export type State = ReturnType<typeof reducer>

const middlware = compose(
  applyMiddleware(thunk),
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
)

// create the redux store
export default createStore<State, any, any, any>(reducer, {}, middlware)
