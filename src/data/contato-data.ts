import {v4 as uuidv4} from 'uuid';
import { contatoProps } from "../types/types"


const getContato = async (DB: D1Database, idUser: string) => {
    const stmt = DB.prepare(`
    select id_contato,
    co.id_categoria,
    ca.categoria,
    nome,
    email,
    celular
    from contato co,
    categoria ca
    where co.id_categoria = ca.id_categoria
    and co.id_usuario = ?
    `).bind(idUser)

    const { results } = await stmt.all()

    return results
}

const getOneContato = async (DB: D1Database, idContato: string) => {
    const stmt = DB.prepare(`
    select id_contato,
    co.id_categoria,
    ca.categoria,
    nome,
    email,
    celular
    from contato co,
    categoria ca
    where co.id_categoria = ca.id_categoria
    and co.id_contato = ?
    `).bind(idContato)

    const { results } = await stmt.all()

    return results
}

const updateContato = async (DB: D1Database, contato: contatoProps, idContato: string) => {

    const stmt = DB.prepare(`
        update contato
        set id_categoria = ?1,
        nome = ?2,
        email = ?3,
        celular = ?4
        where id_contato = ?5
    `).bind(contato.categoria, contato.nome, contato.email, contato.celular, idContato)

    const { success } = await stmt.run()

    return success
}

const insertContato = async (DB: D1Database, contato: contatoProps, idUser: string) => {

    const uiid = uuidv4()
    
    
    const stmt = DB.prepare(`
        insert into contato(id_contato, id_categoria, id_usuario, nome, email, celular)
        values(?1,?2,?3,?4,?5,?6)
    `).bind(uiid,contato.categoria, idUser, contato.nome, contato.email, contato.celular)

    const { success } = await stmt.run()

    return success
}

const deleteContato = async (DB: D1Database, idContato: string) => {
    const stmt = DB.prepare(`
        delete from contato
        where id_contato = ?
    `).bind(idContato)

    const { success } = await stmt.run()

    return success
}

export default {
    getContato,
    getOneContato,
    updateContato,
    insertContato,
    deleteContato
}