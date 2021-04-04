import { Typography } from "@material-ui/core"
import React from "react"
import { Event } from "../../models/event"

interface Props {
  event: Event
}
const EventTile: React.FC<Props> = ({ event }) => {
  return (
    <div>
      <Typography variant="h6" component="p">
        {event.name}
      </Typography>
    </div>
  )
}
export default EventTile
