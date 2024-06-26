import { Router, Request, Response} from "express";

import { Autenticaca_controller } from "../modules/autenicacao/autenticacao_controller";
const routes = Router();

const autenicacao_controller = new Autenticaca_controller()

// routes.get('/', async (req: Request, res: Response) => {
//   const users = await database.user.findMany()
//   return res.json({Usuarios: users})
// })

routes.post('/', autenicacao_controller.handle)

export default routes;