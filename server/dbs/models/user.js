import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  userName: String,
  password: String,
  token: String,
  create_time: Date
})

export default mongoose.model('User', UserSchema)