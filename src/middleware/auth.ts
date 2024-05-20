import { Context, Next } from "hono"
import jwt from "../utils/jwt"

const auth = async (c: Context, next: Next) => {

    const token = c.req.raw.headers.get("Authorization")

    if (token === null) {
        return c.json({ message: "Token is Required" }, 401)
    }

    try {
        const [_, id] = token.split(' ')

        const result = await jwt.decode(id, c.env.KEY)

        c.set('jwtPayload', result)

        await next()
    } catch (err) {
        console.log(err)
        return c.json({ message: "Token Invalid" }, 401)
    }
}

export default auth