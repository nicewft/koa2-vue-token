import axios from '@/utils/fetch'
import * as types from './mutation_types'
import cookie from '@/utils/common'
import {Message} from 'element-ui'
import { resolve } from 'any-promise';

export default {
  toLogin: ({ commit }, obj) => {
    return new Promise((resolve, reject) => {
      axios.post('/login', {userName: obj.userName, password: obj.password}).then(res => {
        if (res.data.code === 0) {
          let token = res.data.token
          commit(types.SET_TOKEN, token)
          cookie.set('token', token)
          resolve()
        } else {
          Message({
            type: 'warning',
            message: res.data.desc
          })
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  toRegister: ({ commit }, obj) => {
    return new Promise((resolve, reject) => {
      axios.post('/register', {userName: obj.userName, password: obj.password}).then(res => {
        if (res.data.code === 0) {
          Message({
            type: 'success',
            message: res.data.desc
          })
          let token = res.data.token
          commit(types.SET_TOKEN, token)
          cookie.set('token', token)
          resolve()
        } else {
          Message({
            type: 'warning',
            message: res.data.desc
          })
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  toLogout: ({commit}) => {
    axios.post('/logout').then(res => {
      if (res.data.code === 0) {
        commit(types.SET_TOKEN, '')
        cookie.delete('token')
        window.location.reload()
      }
    })
  }
}
