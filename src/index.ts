import { Hono } from 'hono'
import { cors } from 'hono/cors'
import categoriaRouter from './router/categoria-router'
import contatoRouter from './router/contato-router'
import userRouter from './router/user-router'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()

app.use('/api/*', cors())
app.route('/api/categoria', categoriaRouter)
app.route('/api/contato', contatoRouter)
app.route('/api/user', userRouter)

app.onError((err, c) => {
  if(err instanceof HTTPException){
    return err.getResponse()
  }

  console.log(err)
  return c.text('Internal Server Error', 500)
  
})

export default app
