import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

const toHash = (params) => { // 传参转码
  var obj = {}
  for (var i in params) {
    obj[i] = encodeURIComponent(params[i])
  }
  return obj
}

const get = (url, params, store, boolean) => { // get 请求  boolean 是否需要转码 默认不转码
  return new Promise((resolve, reject) => {
    if (boolean === null || boolean === '' || boolean === undefined) {
      boolean = false
    }
    store.dispatch('setLoading', true)
    axios.get(url, { params: boolean === false ? params : toHash(params) }).then(res => {
      console.log(res)
      if (res.data.msg.code === '20000') { // 成功
        resolve(res.data)
      } else if (res.data.msg.code === '40001') {
        // resolve(res.data)
        store.dispatch('setClearTableData')
        store.dispatch('setClearPage')
        Message({type: 'error', message: res.data.msg.message})
      } else {
        // resolve(res.data)
        store.dispatch('setClearTableData')
        store.dispatch('setClearPage')
        Message({type: 'error', message: '出错了'})
      }
      store.dispatch('setLoading', false)
    }).catch(err => {
      reject(err)
      store.dispatch('setClearTableData')
      store.dispatch('setClearPage')
      store.dispatch('setLoading', false)
      Message({type: 'error', message: '网络异常'})
    })
  })
}

const post = (url, params, store, boolean) => { // post请求 boolean 是否需要转码 默认不转码
  return new Promise((resolve, reject) => {
    if (boolean === null || boolean === '' || boolean === undefined) {
      boolean = false
    }
    store.dispatch('setLoading', true)
    axios.post(url, qs.stringify(boolean === false ? params : toHash(params))).then(res => {
      resolve(res.data)
      store.dispatch('setLoading', false)
    }).catch(err => {
      reject(err)
      store.dispatch('setLoading', false)
      Message({type: 'error', message: '网络异常'})
    })
  })
}

export default {
  get, post
}
