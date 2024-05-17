import { Hono } from "hono";
import contatoService from "../service/contato-service";

type Bindings = {
    DB: D1Database
}

const contatoRouter = new Hono<{ Bindings: Bindings }>();

contatoRouter.get('/:iduser/search/:search?', async (c) => {
    const {iduser, search} = c.req.param()

    const result = await contatoService.getContatoService(c.env.DB, iduser, search === undefined ? "" : search)

    return c.json(result)
})

contatoRouter.get('/one/:idcontato', async (c) => {
    const idcontato = c.req.param('idcontato')

    const result = await contatoService.getOneContatoService(c.env.DB, idcontato)

    if (result.length === 0) {
        return c.json({}, 400)
    }

    return c.json(result)
})

contatoRouter.put('/alterar', async (c) => {
    const contato = await c.req.json()

    const result = await contatoService.updateContatoService(c.env.DB, contato.data, contato.idcontato)

    return c.json(result)
})

contatoRouter.post('/cadastrar', async(c) => {
    const contato = await c.req.json()

    const result = await contatoService.insertContatoService(c.env.DB, contato.data,'09f02ace9d36ad7a583e4fb252fb957e')

    return c.json(result)
})

contatoRouter.delete('/deletar', async(c) => {
    const data = await c.req.json()

    const result = await contatoService.deleteContatoService(c.env.DB, data.idcontato)
    
    return c.json(result)
})

export default contatoRouter;