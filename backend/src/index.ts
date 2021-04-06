import cors from "cors"
import express from "express"
import { orgRouter } from "./routes/org"
import { todoRouter } from "./routes/todo"
import { authRouter } from "./routes/auth"

// create a new express app
// this will be used to add all routes and request handlers
const app = express()

// allow express to accept application/json requests
app.use(express.json())
// allow the backend to be accessed from your frontend
app.use(cors())

// add the todo route
// all routes specified by todoRouter will be hit with /todo/{route}
app.use("/todo", todoRouter)
app.use("/auth", authRouter)
app.use("/org", orgRouter)

// start the app
app.listen(process.env.PORT || 8080, () => console.log("Server started."))
