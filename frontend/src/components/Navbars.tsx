import React from "react"
import { useHistory } from "react-router-dom"
import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core"
import cohort from "../assets/cohort.png"

const useStyles = makeStyles({
  toolbar: {
    height: "64px",
    display: "flex",
    justifyContent: "space-between",
    padding: "8px"
  },
  toolbarSection: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  menuButton: {
    marginRight: "1rem",
  },
  logo: {
    height: "100%",
  },
})

const Navbar = (): JSX.Element => {
  const history = useHistory()
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.toolbarSection}>
          <img className={classes.logo} src={cohort} />
        </div>
        <div className={classes.toolbarSection}>
          <Button onClick={() => history.push("/")} color="inherit">
            HOME
          </Button>
          <Button onClick={() => history.push("/events")} color="inherit">
            EVENTS
          </Button>
          <Button onClick={() => history.push("/orgs")} color="inherit">
            ORGANIZATIONS
          </Button>
          <Button onClick={() => history.push("/signin")} color="inherit">
            SIGN-IN
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}
export default Navbar
