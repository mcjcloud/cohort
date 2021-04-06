import { Button, CircularProgress, List, ListItem, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Org } from "../../models/org"
import { selectUser } from "../../store/auth"
import { fetchOrgs, selectIsFetchingOrgs, selectOrgs } from "../../store/org"
import CreateOrgModal from "./CreateOrgModal"

const useStyles = makeStyles({
  root: {
    width: "100vw",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
  },
  header: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "32px",
  },
  orgList: {
    width: "100%",
    maxWidth: "1000px",
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
})

const OrgsPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const orgs = useSelector(selectOrgs())
  const isFetchingOrgs = useSelector(selectIsFetchingOrgs())
  const user = useSelector(selectUser())

  useEffect(() => {
    dispatch(fetchOrgs())
  }, [dispatch])

  if (isFetchingOrgs) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      {/* <p>{JSON.stringify(user)}</p> */}
      <div className={classes.header}>
        <Typography variant="h4" component="h4">
          Organizations
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          ADD ORG
        </Button>
        <CreateOrgModal open={modalOpen} close={() => setModalOpen(false)} />
      </div>
      <List component="nav" className={classes.orgList}>
        {orgs.map((org: Org) => (
          <ListItem component="div" className={classes.listItem}>
            <div className={classes.info}>
              <Typography variant="h6" component="p">
                {org.name}
              </Typography>
              <Typography variant="caption" component="p">
                {org.description}
              </Typography>
            </div>
            {user && <>{user.orgs.includes(org.guid) && <Button>Leave</Button>}</>}
            {user && <>{!user.orgs.includes(org.guid) && <Button>Join</Button>}</>}
          </ListItem>
        ))}
      </List>
    </div>
  )
}
export default OrgsPage
