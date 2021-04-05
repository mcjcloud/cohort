import { v4 as uuid } from "uuid"

import { useCollection } from "./db"
import { Org } from "../models/org"

/**
 * get all todo items in the database
 */
export const getOrgs = async (): Promise<Org[]> => {
  const orgCollection = await useCollection<Org>("org")
  return await orgCollection.find({}).toArray()
}

/**
 * get an org with the given ID
 */
export const getOrgById = async (_id: string): Promise<Org> => {
  const orgCollection = await useCollection<Org>("org")
  return await orgCollection.findOne<Org>({ _id })
}

/**
 * Create a new org and store it in the database
 */
export const addOrg = async (org: Org): Promise<Org> => {
  const orgCollection = await useCollection<Org>("org")
  const guid = uuid()
  const item: Org = { ...org, guid }
  const { result } = await orgCollection.insertOne(item)
  if (!result.ok) {
    throw new Error("Could not insert org")
  }
  return item
}
