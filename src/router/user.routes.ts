import { Router } from "express";
import { CreateUserController } from "../modules/User/createUser/CreateUserController";
import private_route from "../middleware/private_route";
// import { DeleteUserController } from "../modules/User/deleteUser/DeleteUserController";
// import { EditUserController } from "../modules/User/editUser/EditUserController";
import { GetUserController } from "../modules/User/getUser/GetUserController";
import { ValidaUserController } from "../modules/User/validarUser/ValidaUserController";
// import { ListUserController } from "../modules/User/listUsers/ListUserController";

const routes = Router();

// const listUserController = new ListUserController();
const createUserController = new CreateUserController();
// const editUserController = new EditUserController();
const getUserController = new GetUserController();
const validaUserController = new ValidaUserController();
// const deleteUserUseCase = new DeleteUserController();

routes.post("", createUserController.handle);
// routes.get("", listUserController.handle);
routes.get("/valida/:cpf", validaUserController.handle);
routes.get("/:id", getUserController.handle);
// routes.put("/:id", editUserController.handle);
// routes.delete("/:id", deleteUserUseCase.handle);

export default routes;