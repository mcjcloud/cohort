import express, { Request, Response } from "express"
import { check, validationResult } from "express-validator/check"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserScheme, { User } from "../models/user"
export const authRouter = express.Router()
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

authRouter.post(
  "/signup",
  [
    check("firstName", "Please Enter a Valid Username").not().isEmpty(),
    check("lastName", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(500).json({
        error: errors.array().join(", "),
      })
    }

    const { firstName, lastName, email, password } = req.body
    try {
      let user = await UserScheme.findOne({
        email,
      })
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        })
      }
      user = new UserScheme({
        firstName,
        lastName,
        email,
        password,
      })

      const salt = await bcrypt.genSalt(10)
      user.set("password", await bcrypt.hash(password, salt))

      await user.save()

      const token = jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        "randomString",
        {
          expiresIn: 10000,
        }
      )
      const userJson = user.toObject() as User
      delete userJson.password
      res.status(200).json({ token, user: userJson })
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ error: "Error creating user" })
    }
  }
)
authRouter.post(
  "/signin",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
      })
    }

    const { email, password } = req.body
    try {
      const user = await UserScheme.findOne({
        email,
      })
      if (!user) {
        return res.status(403).json({
          error: "Incorrect email or password",
        })
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      if (hash !== user.get("password")) {
        return res.status(403).json({
          error: "Incorrect email or password",
        })
      }

      const token = jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        "randomString",
        {
          expiresIn: 10000,
        }
      )
      const userJson = user.toObject() as User
      delete userJson.password
      res.status(200).json({ token, user: userJson })
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Error in Saving")
    }
  }
)
