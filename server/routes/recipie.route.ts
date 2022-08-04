import { Router } from "express"
import Recipie from "../models/Recipie"
import { verifyUser } from "../middleware/auth"
import User from "../models/User"

const recipieRouter = Router()

recipieRouter.get("/api/recipie/:id", verifyUser, async (req, res) => {
  res.send(await Recipie.findById(req.params.id))
})

recipieRouter.post("/api/recipie/add", verifyUser, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.ingredients ||
    !req.body.timeTaken ||
    !req.body.cover
  )
    return res.status(400)
  const recipie = await new Recipie({
    name: req.body.name,
    description: req.body.description,
    timeTaken: req.body.timeTaken,
    ingredients: req.body.ingredients,
    cover: req.body.cover,
    author: req.user?.id,
  }).save()
  res.send(recipie)
  const user = await User.findById(req.user?.id)
  if (user) {
    user.recipies.push(recipie.id)
    user.save()
  }
})

recipieRouter.put("/api/recipie/:id", verifyUser, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.ingredients ||
    !req.body.timeTaken
  )
    return res.status(400)

  const recipie = await Recipie.findById(req.params.id)
  if (!recipie) return res.status(500)

  recipie.name = req.body.name
  recipie.description = req.body.description
  recipie.timeTaken = req.body.timeTaken
  recipie.ingredients = req.body.ingredients

  await recipie.save()
  res.send(recipie)
})

recipieRouter.delete("/api/recipie/:id", verifyUser, async (req, res) => {
  res.send(await Recipie.findByIdAndDelete(req.params.id))
})

export default recipieRouter
