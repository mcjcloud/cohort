import { makeStyles, Card, TextField, Button, Tabs, Tab, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { selectSignInError, selectSignUpError, signIn, signUp } from "../store/auth"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100%",
  },
  signinCard: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
  },
  signinContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
  },
  tabs: {
    width: "100%",
    marginBottom: "8px",
  },
  input: {
    marginTop: "8px",
    width: "100%",
  },
  buttonGroup: {
    width: "100%",
    marginTop: "8px",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "8px",
  },
  error: {
    marginTop: "8px",
    color: "red",
  },
})

const SigninPage = (): JSX.Element => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const signInError = useSelector(selectSignInError())
  const signUpError = useSelector(selectSignUpError())

  const [tab, setTab] = useState<number>(0)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  const signin = async () => {
    const user: any = await dispatch(signIn(email, password))
    if (user) {
      history.push("/")
    }
  }

  const signup = async () => {
    const user: any = await dispatch(signUp(firstName, lastName, email, password))
    if (user) {
      history.push("/")
    }
  }

  return (
    <div className={classes.root}>
      <Card variant="outlined" className={classes.signinCard}>
        <Tabs
          className={classes.tabs}
          variant="fullWidth"
          indicatorColor="primary"
          value={tab}
          onChange={(_, v) => setTab(v)}
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <div className={classes.signinContent}>
          {/* <AppBar position="static"> */}
          {/* </AppBar> */}
          {tab === 1 && (
            <>
              <TextField
                variant="outlined"
                className={classes.input}
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                variant="outlined"
                className={classes.input}
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <TextField
            variant="outlined"
            className={classes.input}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            className={classes.input}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={classes.buttonGroup}>
            {tab === 0 && (
              <Button
                variant="contained"
                color="primary"
                disabled={!email || !password}
                onClick={signin}
              >
                Sign In
              </Button>
            )}
            {tab === 1 && (
              <Button
                variant="contained"
                color="primary"
                disabled={!email || !password || !firstName || !lastName}
                onClick={signup}
              >
                Sign Up
              </Button>
            )}
          </div>
          {tab === 0 && signInError && (
            <Typography variant="caption" component="p" className={classes.error}>
              {signInError}
            </Typography>
          )}
          {tab === 1 && signUpError && (
            <Typography variant="caption" component="p" className={classes.error}>
              {signUpError}
            </Typography>
          )}
        </div>
      </Card>
    </div>
  )
}
export default SigninPage
