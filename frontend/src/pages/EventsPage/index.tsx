import { Button, Fab, makeStyles, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React, { useState } from "react"
import CreateEventModal from "./CreateEventModal"

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
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" component="h4">
          Upcoming Events
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          ADD EVENT
        </Button>
        <CreateEventModal open={modalOpen} close={() => setModalOpen(false)} />
      </div>
    </div>
  )
}
export default EventsPage
