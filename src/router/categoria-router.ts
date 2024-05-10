import { Hono } from "hono";
import auth from "../middleware/auth";

const categoriaRouter = new Hono();

categoriaRouter.get('/',auth,(c) => {

    console.log(c.get('jwtPayload'))

    return c.json({})
})

export default categoriaRouter;