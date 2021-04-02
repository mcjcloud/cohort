import { RouteProps } from "react-router-dom"
import EventsPage from "./pages/EventsPage"

import HomePage from "./pages/HomePage"
import SigninPage from "./pages/SigninPage"

const routes: RouteProps[] = [
  { path: "/", component: HomePage, exact: true },
  { path: "/signin", component: SigninPage },
  { path: "/events", component: EventsPage },
]
export default routes
