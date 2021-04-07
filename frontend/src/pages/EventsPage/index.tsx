import { Button, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../store/auth"
import { fetchEvents, selectEvents } from "../../store/event"
import { fetchOrgs } from "../../store/org"
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
  eventGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    justifyContent: "center",
    gap: "16px",
  },
})

const EventsPage = (): JSX.Element => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const events = useSelector(selectEvents())
  const user = useSelector(selectUser())

  useEffect(() => {
    dispatch(fetchEvents())
    dispatch(fetchOrgs())
  }, [dispatch])

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
