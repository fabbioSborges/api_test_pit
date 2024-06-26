import jwt from 'jsonwebtoken'
export default function generateAuthToken(params = {}){
  return jwt.sign(params, "jwt", { expiresIn: 8000})
}