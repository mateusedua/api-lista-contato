import { Hono } from 'hono'
import categoriaRouter from './router/categoria-router'
import contatoRouter from './router/contato-router'
import userRouter from './router/user-router'

const app = new Hono()

app.route('/api/categoria', categoriaRouter)
app.route('/api/contato', contatoRouter)
app.route('/api/user', userRouter)

app.onError((err, c) => {
  console.log(err)
  return c.text('Internal Server Error', 500)
})

export default app
