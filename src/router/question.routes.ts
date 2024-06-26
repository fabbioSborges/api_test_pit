import { Router } from "express";
import { CreateQuestionController } from "../modules/Question/createQuestion/CreateQuestionController";
import private_route from "../middleware/private_route";
// import { DeleteUserController } from "../modules/User/deleteUser/DeleteUserController";
// import { EditUserController } from "../modules/User/editUser/EditUserController";
import { GetQuestionController } from "../modules/Question/getQuestion/GetQuestionController";
import { ListQuestionController } from "../modules/Question/listQuestion/ListQuestionController";

const routes = Router();

const listQuestionController = new ListQuestionController();
const createQuestionController = new CreateQuestionController();
// const editUserController = new EditUserController();
const getQuestionController = new GetQuestionController();
// const deleteUserUseCase = new DeleteUserController();

routes.post("", createQuestionController.handle);
routes.get("", listQuestionController.handle);
routes.get("/:id", getQuestionController.handle);
// routes.put("/:id", editUserController.handle);
// routes.delete("/:id", deleteUserUseCase.handle);

export default routes;