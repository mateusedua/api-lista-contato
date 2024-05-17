import contatoData from "../data/contato-data"
import { contatoProps } from "../types/types"

const getContatoService = async (DB: D1Database, idUser: string, search?: string) => {
    const result = await contatoData.getContato(DB, idUser,search)
    return result
}

const getOneContatoService = async (DB: D1Database, idContato: string) => {
    const result = await contatoData.getOneContato(DB, idContato)
    return result
}

const updateContatoService = async (DB: D1Database, contato: contatoProps, idContato: string) => {
    const result = await contatoData.updateContato(DB, contato, idContato)
    return result
}

const insertContatoService = async (DB:D1Database, contato: contatoProps, idUser: string) => {
    const result = await contatoData.insertContato(DB, contato, idUser)
    return result
}

const deleteContatoService = async (DB:D1Database, idContato: string) => {
    const result = await  contatoData.deleteContato(DB, idContato)
    return result
}

export default {
    getContatoService,
    getOneContatoService,
    updateContatoService,
    insertContatoService,
    deleteContatoService
}