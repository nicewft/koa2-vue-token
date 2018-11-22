import jwt from 'jsonwebtoken'

export default async (ctx, next) => {
  if (ctx.request.header['authorization']) {
    let token = ctx.request.header['authorization'].split(' ')[1]
    // let token = ctx.request.header['authorization']
    // let decoded = jwt.decode(token, 'laowang')
    let tokenContent;
    try {
      tokenContent = await jwt.verify(token, 'laowang')
      await next()
    } catch (error) {
      ctx.status = 401
      ctx.body = {
        msg: 'token过期'
      }
    }
    // console.log(tokenContent)
    // if (token && decoded.exp <= new Date()/1000) {
    //   ctx.status = 401
    //   ctx.body = {
    //     msg: 'token过期'
    //   }
    // } else {
    //   // 如果权限没问题，那么交给下一个控制器处理
    //   return next();
    // }
  } else {
    ctx.status = 401
    ctx.body = {
      msg: '没有token'
    }
  }
}