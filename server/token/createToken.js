import jwt from 'jsonwebtoken'

export default function (user_id) {
  const token = jwt.sign({
    user_id: user_id
  }, 'laowang', {
    expiresIn: '60s'
  })
  return token
}