import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Event } from "../../models/event"
import { selectOrgs } from "../../store/org"
import cohort from "../../assets/cohort.jpeg"
import { useHistory } from "react-router"
import { rsvpEvent, unrsvpEvent, selectUser } from "../../store/auth"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  imgWrapper: {
    height: "200px",
    backgroundColor: "black",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
})

interface Props {
  event: Event
}
const EventTile: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const orgs = useSelector(selectOrgs())
  const user = useSelector(selectUser())

  const rsvp = async () => {
    if (user) {
      dispatch(rsvpEvent(event.guid, user.guid))
    }
  }

  const unrsvp = async () => {
    if (user) {
      dispatch(unrsvpEvent(event.guid, user.guid))
    }
  }

  return (
    <Card
      variant="outlined"
      className={classes.root}
      onClick={() => history.push(`/events/${event.guid}`)}
    >
      <CardActionArea>
        <CardMedia component="img" alt="event" height="200" src={cohort} />
        <CardContent className={classes.content}>
          <Typography variant="h6" component="p">
            {event.name}
          </Typography>
          <Typography variant="caption" component="p">
            {orgs.find((o) => event.organizer === o.guid)?.name}
          </Typography>
          {/* <Typography variant="body1" component="p">
            {event.startDate} - {event.endDate}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      {user && (
        <CardActions>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              if (user.rsvps.includes(event.guid)) {
                unrsvp()
              } else {
                rsvp()
              }
            }}
          >
            {user.rsvps.includes(event.guid) ? "UNRSVP" : "RSVP"}
          </Button>
        </CardActions>
      )}
    </Card>
  )
}
export default EventTile
