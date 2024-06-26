import { Request, Response} from "express";
import { Autenticacao_use_case } from "./autenticacao_use_case";

export class Autenticaca_controller{
  async handle(req: Request, res: Response) {
    const {email, password} = req.body
    try{ 
      const autenticacao_use_case = new Autenticacao_use_case()
      const result = await autenticacao_use_case.execute(email)
     return res.json({"Messagem": result})  
    }catch (e){
      return res.status(400).json({message: `Não foi possive criar usuario - ${e}`})
    }
  }
}