import { Router } from "express"
import { verifyUser } from "../middleware/auth"
import Recipie from "../models/Recipie"
import User from "../models/User"

const recipiesRouter = Router()

recipiesRouter.get("/api/recipies", verifyUser, async (req, res) => {
  const user = await User.findById(req.user?.id).populate("recipies")
  if (!user) return res.status(500)
  res.send(user.recipies)
})

recipiesRouter.get("/api/recipies/search", verifyUser, async (req, res) => {
  if (!req.query.q) return res.status(400)
  const recipies = await Recipie.find({ author: req.user?.id }).where({
    $text: {
      $search: req.query.q,
    },
  })
  res.send(recipies)
})

export default recipiesRouter
