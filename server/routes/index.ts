import { Express } from "express"
import { authRouter } from "./auth.route"
import recipieRouter from "./recipie.route"
import recipiesRouter from "./recipies.route"
const addRoutes = (app: Express) => {
  app.use(authRouter)
  app.use(recipieRouter)
  app.use(recipiesRouter)
}
export default addRoutes
