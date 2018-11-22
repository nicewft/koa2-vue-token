import Router from 'koa-router'
import UserController from '../controller/user'
import checkToken from '../token/checkToken'

const userRouter = new Router({
  prefix: '/api'
})

userRouter.post('/getAllUser', checkToken, UserController.getAllUser)

userRouter.post('/removeUserById', UserController.removeUserById)

userRouter.post('/register', UserController.register)

userRouter.post('/login', UserController.login)

userRouter.post('/logout', UserController.logout)

export default userRouter