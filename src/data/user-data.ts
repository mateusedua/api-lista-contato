import { userProps } from "../types/types"
import {v4 as uuidv4} from 'uuid';

const getEmail = async (DB: D1Database, email: string) => {
    const stmt = DB.prepare(`
        select id_usuario from usuario where email = ?
    `).bind(email)

    const values = await stmt.first()

    return values
}

const insertUser = async(DB: D1Database, user: userProps) => {

    const uiid = uuidv4()

    const stmt = DB.prepare(`
        insert into usuario(id_usuario, nome, email, password)
        values(?1,?2,?3,?4)
    `).bind(uiid,user.nome, user.email, user.password)

    const { success } = await stmt.run()

    return success
}

export default {
    getEmail,
    insertUser
}