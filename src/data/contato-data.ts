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
    `).bind(contato.categoria, contato.nome, contato.email, contato.telefone, idContato)

    const { success } = await stmt.run()

    return success
}

export default {
    getContato,
    getOneContato,
    updateContato
}