import { Hono } from "hono";
import userService from "../service/user-service";

type Bindings = {
    DB: D1Database,
    KEY: string
}

const userRouter = new Hono<{Bindings:Bindings}>();

userRouter.post('/cadastrar',async (c) => {
    const user = await c.req.json()

    await userService.cadastroService(c.env.DB,user, c.env.KEY)

    return c.json({
        message: 'usuario cadastrado'
    })
})

export default userRouter;