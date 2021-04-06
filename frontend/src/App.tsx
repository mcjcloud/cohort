import React, { useEffect } from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { makeStyles } from "@material-ui/core"
import Navbars from "./components/Navbar"
import routes from "./routes"
import store from "./store"
import { renew, selectUser } from "./store/auth"

// Styles
const useStyles = makeStyles({
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
})

// App component
// this component renders the entire app inside the Provider and Router
const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
export default App

const AppContent = (): JSX.Element => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const user = useSelector(selectUser())

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token && !user) {
      dispatch(renew(token)) // refresh token
    }
  }, [user, dispatch])

  return (
    <Router>
      <div className={classes.app}>
        {/* nav bar */}
        <Navbars />
        {/* switch -- this finds the first route that matches the current url and renders its component (see routes.ts) */}
        <Switch>
          {routes.map((props, i) => (
            <Route key={`route_${i}`} {...props} />
          ))}
        </Switch>
      </div>
    </Router>
  )
}
