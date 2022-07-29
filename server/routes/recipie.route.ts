import { Router } from "express"
import Recipie from "../models/Recipie"

const recipieRouter = Router()

recipieRouter.post("/api/recipie/add", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.ingredients ||
    !req.body.timeTaken
  )
    return res.status(400)
  const recipie = new Recipie({
    name: req.body.name,
    description: req.body.description,
    timeTaken: req.body.timeTaken,
    ingredients: req.body.ingredients,
  })
  await recipie.save()
  res.send(recipie)
})

recipieRouter.put("/api/recipie/:id", async (req, res) => {
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

export default recipieRouter
