import { userProps } from "../types/types"
import userData from "../data/user-data"
import { HTTPException } from "hono/http-exception"
import { genSalt, hash, compare} from "bcryptjs"
import jwt from "../utils/jwt"

const genSecPassword = async (password: string) => {
    const salt = await genSalt(10)
    return await hash(password, salt)
}

const cadastroService = async (DB:D1Database, user: userProps) => {
    const foundEmail  = await userData.getDataUser(DB,user.email)
    if(foundEmail !== null){
        throw new HTTPException(302, {message: 'email found'})
    }

    user.password = await genSecPassword(user.password)

    const result = await userData.insertUser(DB, user)

    if(result) {
        return
    }

    throw new HTTPException(400, {message: 'error insert user'})
}


const loginService = async (DB:D1Database, user: userProps, key: string) => {
    const foundUser = await userData.getDataUser(DB, user.email)

    if(foundUser === null){
        throw new HTTPException(404, {message: 'email not found'})
    }

    const userConvert = JSON.parse(JSON.stringify(foundUser))

    const passwordCompare = await compare(user.password,userConvert.password)

    if(!passwordCompare){
        throw new HTTPException(404, {message: 'password not allowed'})
    }

    const token = await jwt.encode({
        idUser: userConvert.id_usuario,
        nome: userConvert.nome
    },key)

    return token
}

export default {
    cadastroService,
    loginService
}