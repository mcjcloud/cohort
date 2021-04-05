import { Typography } from "@material-ui/core"
import React from "react"
import { Org } from "../../models/org"

interface Props {
  org: Org
}
const OrgTile: React.FC<Props> = ({ org }) => {
  return (
    <div>
      <Typography variant="h6" component="p">
        {org.name}
      </Typography>
    </div>
  )
}
export default OrgTile
