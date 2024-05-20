import { Hono } from "hono";
import contatoService from "../service/contato-service";
import auth from "../middleware/auth";

type Bindings = {
    DB: D1Database
}

const contatoRouter = new Hono<{ Bindings: Bindings }>();

contatoRouter.get('/:search?', auth, async (c) => {
    const { search } = c.req.param()
    const user = c.get('jwtPayload')

    const result = await contatoService.getContatoService(c.env.DB, user.idUser, search === undefined ? "" : search)

    return c.json(result)
})

contatoRouter.get('/one/:idcontato', auth, async (c) => {
    const idcontato = c.req.param('idcontato')

    const result = await contatoService.getOneContatoService(c.env.DB, idcontato)

    if (result.length === 0) {
        return c.json({}, 400)
    }

    return c.json(result)
})

contatoRouter.put('/alterar', auth, async (c) => {
    const contato = await c.req.json()

    const result = await contatoService.updateContatoService(c.env.DB, contato.data, contato.idcontato)

    return c.json(result)
})

contatoRouter.post('/cadastrar', auth, async (c) => {
    const contato = await c.req.json()
    const user = c.get('jwtPayload')
    const result = await contatoService.insertContatoService(c.env.DB, contato.data, user.idUser)

    return c.json(result)
})

contatoRouter.delete('/deletar', auth, async (c) => {
    const data = await c.req.json()

    const result = await contatoService.deleteContatoService(c.env.DB, data.idcontato)

    return c.json(result)
})

export default contatoRouter;