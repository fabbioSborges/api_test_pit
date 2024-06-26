import { NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken'

export default function private_route (req: Request, res: Response, next: NextFunction){
  const {authorization} = req.headers

  if(!authorization)
    return res.status(401).json({error: 'jwt não fornecido'})
  jwt.verify(authorization, "jwt", (erro) => {
    if(erro){
      return res.status(401).json({error: `'jwt não autorizado ${erro}`})
    }
    return next()
  })

}