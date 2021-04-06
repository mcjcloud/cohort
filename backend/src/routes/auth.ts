import express, { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/User"
import { useCollection } from "../services/db"
import { v4 as uuid } from "uuid"

export const authRouter = express.Router()

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
authRouter.post("/signup", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body ?? {}
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "invalid request payload " })
  }

  try {
    const userCollection = await useCollection<User>("user")
    const existingUser = await userCollection.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        error: "User Already Exists",
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const guid = uuid()

    const userPayload: User = {
      guid,
      firstName,
      lastName,
      email,
      password: hash,
      salt,
      orgs: [],
    }
    await userCollection.insertOne(userPayload)

    const token = jwt.sign(
      {
        user: {
          id: guid,
        },
      },
      "randomString",
      {
        expiresIn: 10000,
      }
    )
    delete userPayload.password
    delete userPayload.salt
    res.status(200).json({ token, user: userPayload })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: "Error creating user" })
  }
})

authRouter.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: "missing email or password" })
  }

  try {
    const userCollection = await useCollection<User>("user")
    const user = await userCollection.findOne({ email })
    if (!user) {
      return res.status(403).json({
        error: "Incorrect email or password",
      })
    }

    const hash = await bcrypt.hash(password, user.salt)
    console.log({ hash, password: user.password })
    if (hash !== user.password) {
      return res.status(403).json({
        error: "Incorrect email or password",
      })
    }

    const token = jwt.sign(
      {
        user: {
          id: user.guid,
        },
      },
      "randomString",
      {
        expiresIn: 10000,
      }
    )
    delete user.password
    delete user.salt
    res.status(200).json({ token, user })
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Error in Saving")
  }
})
