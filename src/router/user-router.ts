import { Hono } from "hono";
import userService from "../service/user-service";
import auth from "../middleware/auth";

type Bindings = {
    DB: D1Database,
    KEY: string
}

const userRouter = new Hono<{ Bindings: Bindings }>();

userRouter.post('/cadastrar', async (c) => {
    const user = await c.req.json()

    await userService.cadastroService(c.env.DB, user)

    return c.json({
        message: 'registered user'
    })
})

userRouter.post('/login', async (c) => {
    const user = await c.req.json()

    const result = await userService.loginService(c.env.DB, user, c.env.KEY)

    return c.json(result)
})

userRouter.post('/auth', auth, async (c) => {
    return c.json({})
})

userRouter.get('/', auth, async(c) => {
    const user = c.get('jwtPayload')
    
    const result = await userService.getOneUserService(c.env.DB, user.idUser)

    return c.json(result[0])
})

export default userRouter;