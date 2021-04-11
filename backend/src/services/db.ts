import { Collection, MongoClient } from "mongodb"

const DB_URL =
  "mongodb+srv://ebay:event-bay@cluster0.1iadj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const DB_URL = "mongodb://localhost:27017"

/**
 * create a reference to the mongodb database
 */
const useMongoDB = async (): Promise<MongoClient> => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(DB_URL, (err, client) => {
      if (!!err) {
        return reject(err)
      } else {
        return resolve(client)
      }
    })
  })
}

/**
 * create a connection to a specific collection in mongodb
 */
export const useCollection = async <T>(collectionName: string): Promise<Collection<T>> => {
  const client = await useMongoDB()
  const db = await client.db("cohort")
  return await db.collection<T>(collectionName)
}
