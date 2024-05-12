import { Hono } from "hono";
import auth from "../middleware/auth";
import getCategoriaService from "../service/categoria-service";

type Bindings = {
    DB: D1Database
}

const categoriaRouter = new Hono<{ Bindings: Bindings }>();

categoriaRouter.get('/', async (c) => {

    const result = await getCategoriaService(c.env.DB)

    return c.json(result)
})

export default categoriaRouter;