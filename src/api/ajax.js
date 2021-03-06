/*
  封装ajax请求模块
  返回值： promise对象（异步返回的数据是： response.data）
 */

import axios from "axios";

export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    //执行ajax异步请求
    let promise
    if (type === "GET") {
      //准备url， query参数数据
      let dataStr = ''//数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
