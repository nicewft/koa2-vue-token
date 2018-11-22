import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'
import dbConfig from './server/dbs/config'
import userRouter from './server/routers/user'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.use(userRouter.routes(), userRouter.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
app.listen('3000',() => {
  console.log('The server is running at http://localhost:' + 3000)
})