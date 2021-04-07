import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Event } from "../../models/event"
import { selectOrgs } from "../../store/org"
import cohort from "../../assets/cohort.jpeg"

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
  const classes = useStyles()
  const orgs = useSelector(selectOrgs())

  return (
    <Card variant="outlined" className={classes.root}>
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
    </Card>
  )
}
export default EventTile
