import { Hono } from "hono";
import contatoService from "../service/contato-service";

type Bindings = {
    DB: D1Database
}

const contatoRouter = new Hono<{ Bindings: Bindings }>();

contatoRouter.get('/:iduser', async (c) => {
    const iduser = c.req.param('iduser')

    const result = await contatoService.getContatoService(c.env.DB, iduser)

    return c.json(result)
})

contatoRouter.get('/one/:idcontato', async (c) => {
    const idcontato = c.req.param('idcontato')

    const result = await contatoService.getOneContatoService(c.env.DB, idcontato)

    return c.json(result)
})

export default contatoRouter;