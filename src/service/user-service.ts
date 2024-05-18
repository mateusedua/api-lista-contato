import { userProps } from "../types/types"
import userData from "../data/user-data"
import { HTTPException } from "hono/http-exception"
import { genSalt, hash} from "bcryptjs"
import jwt from "../utils/jwt"

const genSecPassword = async (password: string) => {
    const salt = await genSalt(10)
    return await hash(password, salt)
}

const cadastroService = async (DB:D1Database, user: userProps, key: string) => {
    const foundEmail  = await userData.getEmail(DB,user.email)
    if(foundEmail !== null){
        throw new HTTPException(302, {message: 'email ja existe !'})
    }

    user.password = await genSecPassword(user.password)

    const result = await userData.insertUser(DB, user)

    if(result) {
        return
    }

    throw new HTTPException(400, {message: 'Erro ao inserir usuario'})
}

export default {
    cadastroService
}