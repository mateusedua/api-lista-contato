import contatoData from "../data/contato-data"

const getContatoService = async (DB: D1Database, idUser: string) => {
    const result = await contatoData.getContato(DB, idUser)
    return result
}

const getOneContatoService = async (DB: D1Database, idUser: string) => {
    const result = await contatoData.getOneContato(DB, idUser)
    return result
}

export default {
    getContatoService,
    getOneContatoService
}