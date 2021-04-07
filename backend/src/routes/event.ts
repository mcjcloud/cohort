import express, { Request, Response } from "express"
import { addEvent, getEvents, rsvp, unrsvp } from "../services/event"

// handles all requests made to the /todo route
export const eventRouter = express.Router()

/**
 * GET /
 * fetch all events in the database
 */
eventRouter.get("/", async (_: Request, res: Response) => {
  try {
    const events = await getEvents()
    return res.status(200).json({ events })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

/**
 * POST /
 * create a new event
 */
eventRouter.post("/", async (req: Request, res: Response) => {
  // make sure they included an event
  if (!req.body) {
    return res.status(400).json({ error: "Invalid request body" })
  }
  try {
    const org = await addEvent(req.body)
    return res.status(200).json(org)
  } catch (error) {
    return res.status(500).json({ error })
  }
})

/**
 * POST /join
 * rsvp to event
 */
eventRouter.post("/rsvp", async (req: Request, res: Response) => {
  // make sure they included an org
  if (!req.body || !req.body.eventId || !req.body.userId) {
    return res.status(400).json({ error: "Invalid request body" })
  }
  try {
    const ok = await rsvp(req.body.userId, req.body.eventId)
    return res.status(200).json({ ok })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

/**
 * POST /leave
 * unrsvp to an event
 */
eventRouter.post("/unrsvp", async (req: Request, res: Response) => {
  // make sure they included an org
  if (!req.body || !req.body.eventId || !req.body.userId) {
    return res.status(400).json({ error: "Invalid request body" })
  }
  try {
    const ok = await unrsvp(req.body.userId, req.body.eventId)
    return res.status(200).json({ ok })
  } catch (error) {
    return res.status(500).json({ error })
  }
})
