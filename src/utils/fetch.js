import axios from 'axios'
import Router from 'vue-router'
import store from '../store'

const router = new Router()

const service = axios.create({
  timeout: 10000,
  baseURL: '/api'
})

//添加一个请求拦截器
service.interceptors.request.use(function(config){
  //在请求发送之前做一些事
  if (store.state.token) {
    config.headers['Authorization'] = `token ${store.state.token}`
  }
  return config;
},function(error){
  //当出现请求错误是做一些事
  return Promise.reject(error);
});

//添加一个返回拦截器
service.interceptors.response.use(function(response){
  //对返回的数据进行一些处理
  return response;
},function(error){
  //对返回的错误进行一些处理
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.replace({
          path: 'login',
          // query: {redirect: router.currentRoute.fullPath}
        })
        window.location.reload()
        break;
    }
  }
  return Promise.reject(error);
});

export default service