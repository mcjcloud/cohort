import { Button, Fab, makeStyles, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React, { useState } from "react"
import CreateOrgModel from "./CreateOrgModel"

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

const OrgsPage = (): JSX.Element => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" component="h4">
          Organizations
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          ADD ORGANIZATION
        </Button>
        <CreateOrgModel open={modalOpen} close={() => setModalOpen(false)} />
      </div>
    </div>
  )
}
export default OrgsPage