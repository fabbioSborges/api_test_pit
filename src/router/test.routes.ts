import { Router } from "express";
// import { CreateQuestionController } from "../modules/Question/createQuestion/CreateQuestionController";
import private_route from "../middleware/private_route";
import { IniciarTesteController } from "../modules/Answers/IniciarTeste/IniciarTesteController";
// import { DeleteUserController } from "../modules/User/deleteUser/DeleteUserController";
// import { EditUserController } from "../modules/User/editUser/EditUserController";
import { ListAnswersUserController } from "../modules/Answers/ListAnswersUser/ListAnswersUserController";
// import { ListQuestionController } from "../modules/Question/listQuestion/ListQuestionController";
import {RespostaAssinaladaController} from '../modules/Answers/EnviarResposta/RespostaAssinaladaController'

const routes = Router();

const iniciarTesteController = new IniciarTesteController()
// const listQuestionController = new ListQuestionController();
// const createQuestionController = new CreateQuestionController();
// // const editUserController = new EditUserController();
const listAnswersUserController = new ListAnswersUserController();
// const deleteUserUseCase = new DeleteUserController();
const respostaAssinaladaController = new RespostaAssinaladaController()

routes.post("/resposta", respostaAssinaladaController.handle);
routes.post("/iniciar/:phone", iniciarTesteController.handle);
// routes.post("", createQuestionController.handle);
// routes.get("", listQuestionController.handle);
routes.get("/:phone", listAnswersUserController.handle);
// routes.put("/:id", editUserController.handle);
// routes.delete("/:id", deleteUserUseCase.handle);

export default routes;