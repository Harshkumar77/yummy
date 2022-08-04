import { readFileSync } from "fs"
import mongoose from "mongoose"
import Recipie from "./Recipie"

const userSchema = new mongoose.Schema({
  name: { type: String, r: true },
  email: { unique: true, type: String, r: true },
  profilePic: String,
  accountCreated: {
    type: Date,
    default: Date.now(),
  },
  recipies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Recipie",
      default: [],
      r: true,
    },
  ],
})

const User = mongoose.model("User", userSchema)

export async function findOrCreateUser(
  name: string,
  email: string,
  profilePic: string
) {
  const existingUser = await User.findOne({ email })
  if (existingUser !== null) return existingUser
  const newUser = await User.create({
    name,
    email,
    profilePic,
  })
  newUser.recipies = await NewRecipiesId(newUser.id)
  newUser.save()
  return newUser
}

export default User

declare global {
  namespace Express {
    interface User {
      id: string
    }
  }
}

function NewRecipiesId(id: any) {
  const initialRecipies = JSON.parse(
    readFileSync("data/initialRecipies.json").toString()
  )
  return Promise.all(
    initialRecipies.map(async (r: any) => {
      const recipie = await new Recipie({
        name: r.name,
        description: r.description,
        timeTaken: r.timeTaken,
        ingredients: r.ingredients,
        cover: r.cover,
        author: id,
      }).save()
      return recipie.id
    })
  )
}
