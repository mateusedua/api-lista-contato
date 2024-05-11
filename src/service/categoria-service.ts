import categoriaData from "../data/categoria-data"

const getCategoriaService = async (DB: D1Database) => {
    const result = await categoriaData.getCategoria(DB)
    return result
}

export default getCategoriaService