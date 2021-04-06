import {
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../store/auth"
import { createEvent, selectCreateEventError } from "../../store/event"
import { fetchOrgs, selectIsFetchingOrgs, selectOrgs } from "../../store/org"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    marginTop: "8px",
    width: "100%",
  },
})

interface Props {
  open?: boolean
  close?: () => void
}
const CreateEventModal: React.FC<Props> = ({ open = false, close }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isFetchingOrgs = useSelector(selectIsFetchingOrgs())
  const _organizations = useSelector(selectOrgs())
  const createEventError = useSelector(selectCreateEventError())
  const user = useSelector(selectUser())
  const organizations = _organizations.filter((o) => user?.orgs.includes(o.guid))

  const [name, setName] = useState<string>("")
  const [organizer, setOrganizer] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  // TODO: add image upload
  // const [image, setImage] = useState<string>("")

  useEffect(() => {
    if (open) {
      dispatch(fetchOrgs())
    }
  }, [open, dispatch])

  useEffect(() => {
    if (!organizer && organizations.length > 0) {
      setOrganizer(organizations[0].guid)
    }
  }, [organizations, organizer])

  const _createEvent = async () => {
    const event: any = await dispatch(
      createEvent({
        guid: "",
        name,
        organizer,
        description,
        startDate,
        endDate,
      })
    )
    console.log({ event })
    if (event) {
      close?.()
    }
  }

  return (
    <Dialog className={classes.root} open={open && !!user} onClose={close} fullWidth maxWidth="sm">
      <div className={classes.wrapper}>
        {isFetchingOrgs && (
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        )}
        {!isFetchingOrgs && (
          <>
            <Typography variant="h4" component="h4">
              Create Event
            </Typography>
            <TextField
              variant="outlined"
              className={classes.input}
              label="Event Name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              className={classes.input}
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl variant="outlined" className={classes.input}>
              <InputLabel>Organizer</InputLabel>
              <Select
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value as string)}
                disabled={organizations.length <= 1}
              >
                {organizations.map((org) => (
                  <MenuItem value={org.guid}>{org.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              className={classes.input}
              label="Start Date"
              type="datetime-local"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              variant="outlined"
              className={classes.input}
              label="End Date"
              type="datetime-local"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.input}
              onClick={_createEvent}
              disabled={!name || !organizer || !description || !startDate || !endDate}
            >
              Create
            </Button>
            {createEventError && (
              <Typography variant="body1" component="p">
                {createEventError}
              </Typography>
            )}
          </>
        )}
      </div>
    </Dialog>
  )
}
export default CreateEventModal
