import { Router } from "express"
import Recipie from "../models/Recipie"

const recipiesRouter = Router()

recipiesRouter.get("/api/recipies", async (req, res) => {
  const recipies = await Recipie.find({})
  res.send(recipies)
})

export default recipiesRouter
