import express, { Request, Response } from "express"
import { addOrg, getOrgs } from "../services/org"

// handles all requests made to the /todo route
export const orgRouter = express.Router()

/**
 * GET /
 * fetch all orgs in the database
 */
orgRouter.get("/", async (_: Request, res: Response) => {
  try {
    const orgs = await getOrgs()
    return res.status(200).json({ orgs })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

/**
 * POST /
 * create a new org
 */
orgRouter.post("/", async (req: Request, res: Response) => {
  // make sure they included an org
  if (!req.body) {
    return res.status(400).json({ error: "Invalid request body" })
  }
  try {
    const org = await addOrg(req.body)
    return res.status(200).json(org)
  } catch (error) {
    return res.status(500).json({ error })
  }
})
