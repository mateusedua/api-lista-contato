


const getCategoria = async (DB: D1Database) => {
    const stmt = DB.prepare('select id_categoria,categoria from categoria')
    const { results } = await stmt.all()
    return results
}

export default {
    getCategoria
}