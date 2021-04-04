import { RouteProps } from "react-router-dom"
import EventsPage from "./pages/EventsPage"

import HomePage from "./pages/HomePage"
import OrgsPage from "./pages/OrgPage"
import SigninPage from "./pages/SigninPage"

const routes: RouteProps[] = [
  { path: "/", component: HomePage, exact: true },
  { path: "/signin", component: SigninPage },
  { path: "/events", component: EventsPage },
  { path: "/orgs", component: OrgsPage},
]
export default routes
