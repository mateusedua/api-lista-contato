


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

export default {
    getContato
}