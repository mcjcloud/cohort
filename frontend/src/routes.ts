import { RouteProps } from "react-router-dom"
import EventsPage from "./pages/EventsPage"

import HomePage from "./pages/HomePage"
import OrgsPage from "./pages/OrgsPage"
import SigninPage from "./pages/SigninPage"

const routes: RouteProps[] = [
  { path: "/", component: HomePage, exact: true },
  { path: "/signin", component: SigninPage, exact: true },
  { path: "/events", component: EventsPage, exact: true },
  { path: "/orgs", component: OrgsPage, exact: true },
]
export default routes
