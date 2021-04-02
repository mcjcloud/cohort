import { Button, Fab, makeStyles, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React from "react"

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "32px",
  },
})

const EventsPage = (): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" component="h4">
          Upcoming Events
        </Typography>
        <Button variant="contained" color="primary">ADD EVENT</Button>
      </div>
    </div>
  )
}
export default EventsPage
