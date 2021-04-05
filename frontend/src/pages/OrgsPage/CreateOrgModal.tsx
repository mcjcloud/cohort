import {
  Button,
  CircularProgress,
  Dialog,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createOrg, selectCreateOrgError, selectIsCreatingOrg } from "../../store/org"

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
const CreateOrgModal: React.FC<Props> = ({ open = false, close }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isCreatingOrg = useSelector(selectIsCreatingOrg())
  const createOrgError = useSelector(selectCreateOrgError())

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const _createOrg = async () => {
    const org: any = await dispatch(
      createOrg({
        guid: "",
        name,
        description,
      })
    )
    console.log({ org })
    if (org) {
      close?.()
    }
  }

  return (
    <Dialog className={classes.root} open={open} onClose={close} fullWidth maxWidth="sm">
      <div className={classes.wrapper}>
        <Typography variant="h4" component="h4">
          Create Organization
        </Typography>
        <TextField
          variant="outlined"
          className={classes.input}
          label="Org Name"
          onChange={(e) => setName(e.target.value)}
          disabled={isCreatingOrg}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          disabled={isCreatingOrg}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.input}
          onClick={_createOrg}
          disabled={!name || !description || isCreatingOrg}
        >
          {isCreatingOrg ? <CircularProgress /> : "Create"}
        </Button>
        {createOrgError && (
          <Typography variant="body1" component="p">
            {createOrgError}
          </Typography>
        )}
      </div>
    </Dialog>
  )
}
export default CreateOrgModal
