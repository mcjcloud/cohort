import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { makeStyles } from "@material-ui/core"
import HomePage from "./pages/HomePage"
//import TodoPage from "./pages/TodoPage"
import Navbars from "./components/Navbars"
import routes from "./routes"
import store from "./store"

// Styles
const useStyles = makeStyles({
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  }
})

// App component
// this component renders the entire app inside the Provider and Router
const App = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Provider store={store}>
      <Router>
        <div className={classes.app}>
          {/* nav bar */}
          <Navbars />
          {/* switch -- this finds the first route that matches the current url and renders its component (see routes.ts) */}
          <Switch>
            {routes.map((props, i) => <Route key={`route_${i}`} {...props} />)}
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}
export default App
