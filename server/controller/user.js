import User from '../dbs/models/user'

// 下面两个包用于生成时间
import moment from 'moment'
import objectIdToTimestamp from 'objectid-to-timestamp'
// 用于密码加密
import sha1 from 'sha1'

import createToken from '../token/createToken.js'

// 查找一个用户
const findUser = async (userName) => {
  try {
    return await User.findOne({userName})
  } catch (error) {
    console.log(error)
  }
}

// 获取用户列表
const getAllUser = async (ctx) => {
  let list,code,userName
  let token = ctx.request.header['authorization'].split(' ')[1]
  try {
    list = await User.find()
    let temp = list.filter((item) => token === item.token)
    userName = temp[0].userName
    code=0
  } catch (error) {
    list=error
    code=-1
  }
  ctx.body ={ 
    list: list,
    userName,
    code
  }
}

// 根据id删除用户
const removeUserById = async (ctx) => {
  let result, code
  let id = ctx.request.body.id
  try {
    result = await User.where({_id: id}).remove()
    code=0
  } catch (error) {
    result=error
    code=-1
  }
  ctx.body = {
    result,
    code
  }
}

// 注册
const register = async (ctx) => {
  // let body = ctx.request.body
  let user = new User({
    userName: ctx.request.body.userName,
    password: sha1(ctx.request.body.password),
    token: createToken(ctx.request.body.userName)
  })
  user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss')
  let doc = await findUser(user.userName)
  if (doc) {
    ctx.body = {
      desc: '用户名已存在',
      code: -1
    }
  } else {
    await user.save()
    ctx.body = {
      desc: '注册成功',
      code: 0,
      token: user.token
    }
  }
}

// 登录
const login = async (ctx) => {
  let userName = ctx.request.body.userName
  let password = sha1(ctx.request.body.password)
  let doc = await findUser(userName)
  if (!doc) {
    ctx.body = {
      desc: '该用户未注册',
      code: -1
    }
  } else if (doc.password === password) {
    let token = createToken(userName)
    doc.token = token
    await doc.save()
    ctx.body = {
      desc: '登录成功',
      token,
      code: 0
    }
  } else {
    ctx.body = {
      desc: '密码错误',
      code:-1
    }
  }
}

// 退出登录
const logout = async (ctx) => {
  let token = ctx.request.header['authorization'].split(' ')[1]
  try {
    let user = await User.findOne({token})
    user.token = ''
    await user.save()
    ctx.body = {
      code: 0,
      desc: '退出成功'
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      desc: '退出失败'
    }
  }
}

export default {
  getAllUser,
  removeUserById,
  register,
  login,
  logout
}