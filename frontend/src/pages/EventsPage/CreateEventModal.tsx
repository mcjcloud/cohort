import { CircularProgress, Dialog, makeStyles, TextField, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrgs, selectIsFetchingOrgs } from "../../store/org"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    padding: "32px",
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

  const [name, setName] = useState<string>("")
  const [organizer, setOrganizer] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [startDate, setStartDate] = useState<number>(-1)
  const [endDate, setEndDate] = useState<number>(-1)

  useEffect(() => {
    if (open) {
      dispatch(fetchOrgs())
    }
  }, [open])

  return (
    <Dialog className={classes.root} open={open} onClose={close} fullWidth maxWidth="sm">
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
          </>
        )}
      </div>
    </Dialog>
  )
}
export default CreateEventModal
