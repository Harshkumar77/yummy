import mongoose from "mongoose"

const recipieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, required: true, default: "/assets/pizza.jpg" },
  ingredients: [{ type: String, required: true }],
  timeTaken: { type: Number, required: true },
})

const Recipie = mongoose.model("Recipie", recipieSchema)

export default Recipie
