import React from "react"
import { useHistory } from "react-router-dom"
import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core"
import cohort from "../assets/cohort.png"
import { useDispatch, useSelector } from "react-redux"
import { selectToken, signOut } from "../store/auth"

const useStyles = makeStyles({
  toolbar: {
    height: "64px",
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
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
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const token = useSelector(selectToken())

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.toolbarSection}>
          <img className={classes.logo} src={cohort} alt="logo" />
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
          {!token && (
            <Button onClick={() => history.push("/signin")} color="inherit">
              SIGN IN
            </Button>
          )}
          {token && (
            <Button
              onClick={() => {
                dispatch(signOut())
                history.push("/signin")
              }}
              color="inherit"
            >
              SIGN OUT
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}
export default Navbar
