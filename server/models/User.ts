import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { unique: true, type: String, required: true },
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
      required: true,
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
  return await User.create({
    name,
    email,
    profilePic,
  })
}

export default User

declare global {
  namespace Express {
    interface User {
      id: string
    }
  }
}
