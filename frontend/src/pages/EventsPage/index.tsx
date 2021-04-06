import { Button, makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/auth"
import { selectEvents } from "../../store/event"
import CreateEventModal from "./CreateEventModal"
import EventTile from "./EventTile"

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
  eventGrid: {},
})

const EventsPage = (): JSX.Element => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const events = useSelector(selectEvents())
  const user = useSelector(selectUser())

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" component="h4">
          Upcoming Events
        </Typography>
        {user && (
          <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
            ADD EVENT
          </Button>
        )}
        <CreateEventModal open={modalOpen} close={() => setModalOpen(false)} />
      </div>
      <div className={classes.eventGrid}>
        {events.map((e) => (
          <EventTile event={e} />
        ))}
      </div>
    </div>
  )
}
export default EventsPage
