import { Router } from "express";
const routes = Router();

import testRoutes from "./test.routes"
import userRoutes from "./user.routes"
import questionRoutes from "./question.routes"
import autenticacao_routes from "./autenticacao_routes";
import private_route from "../middleware/private_route";

routes.use("/user", userRoutes);
routes.use("/test", testRoutes);
routes.use("/question", questionRoutes);

routes.get("/", (req, res) => {
  return res.json({ message: "Hello" });
});

routes.use('/login', autenticacao_routes)

export { routes };
