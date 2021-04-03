import express, { Request, Response } from "express"
import { check, validationResult} from "express-validator/check";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
export const authRouter = express.Router()
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

authRouter.post("/signup",
    [
        check("firstName", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("lastName", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({
                errors: errors.array()
            });
        }

      const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }
        user = new User({
          firstName,
          lastName,
          email,
          password
        });

      const salt = await bcrypt.genSalt(10);
      user.set("password", await bcrypt.hash(password, salt));

      await user.save();

      const payload = {
          user: {
              id: user.id
          }
      };
      jwt.sign(
        payload,
        "randomString", {
            expiresIn: 10000
        },
        // (error, token) => {
        //     if (error) throw error;
        //     res.status(200).json({
        //         token
        //     });
        // }
    );
} catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
}
}
);

