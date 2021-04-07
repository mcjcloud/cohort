import { v4 as uuid } from "uuid"

import { useCollection } from "./db"
import { User } from "../models/user"
import { Event } from "../models/event"

/**
 * get all todo items in the database
 */
export const getEvents = async (): Promise<Event[]> => {
  const eventCollection = await useCollection<Event>("event")
  return await eventCollection.find({}).toArray()
}

/**
 * get an org with the given ID
 */
export const getEventById = async (guid: string): Promise<Event> => {
  const eventCollection = await useCollection<Event>("event")
  return await eventCollection.findOne<Event>({ guid })
}

/**
 * Create a new org and store it in the database
 */
export const addEvent = async (event: Event): Promise<Event> => {
  const eventCollection = await useCollection<Event>("event")
  const guid = uuid()
  const item: Event = { ...event, guid }
  const { result } = await eventCollection.insertOne(item)
  if (!result.ok) {
    throw new Error("Could not insert org")
  }
  return item
}

export const rsvp = async (userId: string, eventId: string): Promise<boolean> => {
  const userCollection = await useCollection<User>("user")
  const result = await userCollection.findOneAndUpdate(
    { guid: userId },
    {
      $push: {
        rsvps: eventId,
      },
    }
  )
  return !!result.ok
}

export const unrsvp = async (userId: string, eventId: string): Promise<boolean> => {
  const userCollection = await useCollection<User>("user")
  const result = await userCollection.findOneAndUpdate(
    { guid: userId },
    {
      $pull: {
        rsvps: eventId,
      },
    }
  )
  return !!result.ok
}
