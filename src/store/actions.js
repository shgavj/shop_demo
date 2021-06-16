// 通过mutation间接更新state对象
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOP
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShop
} from '@/api/index'

export default {
  //异步获取地址
  async getAddress({commit, state}) {
    //发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    //提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  //异步获取食品分类列表
  async getCategorys({commit}) {
    //发送异步ajax请求
    const result = await reqFoodCategorys()
    //提交一个mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  //异步获取商家列表
  async getShops({commit, state}) {
    const {longitude, latitude} = state
    //发送异步ajax请求
    const result = await reqShops(longitude, latitude)
    //提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOS, {shops})
    }
  },
  //同步记录用户信息
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  //异步获取登录信息（获取免登陆信息）
  getUserInfo({commit}){
    reqUserInfo().then(res => {
      if (res.code === 0){
        const userInfo = res.data
        commit(RECEIVE_USER_INFO, {userInfo})
      }
    })
  },
  getLogout({commit}){
    reqLogout().then( res => {
      if( res.code === 0){
        commit(RESET_USER_INFO)
      }
    })
  },
  getShopGoods({commit}, callback){
    reqShopGoods().then( res => {
      if( res.code === 0){
        const shop_goods = res.data
        commit(RECEIVE_SHOP_GOODS, {shop_goods})
        //数据更新后通知一下组件
        callback && callback()

      }
    })
  },
  getShopRatings({commit},callback){
    reqShopRatings().then( res => {
      if( res.code === 0){
        const shop_ratings = res.data
        commit(RECEIVE_SHOP_RATINGS, {shop_ratings})
        callback && callback()
      }
    })
  },
  getShopInfo({commit}){
    reqShopInfo().then( res => {
      if( res.code === 0){
        const shop_info = res.data
        commit(RECEIVE_SHOP_INFO, {shop_info})
      }
    })
  },
  //同步更新food中的count值
  updateFoodCount({commit},{isAdd, food}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT, {food})
    }else{
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  clearCart({commit}){
    commit(CLEAR_CART)
  },
  getSearchShop({commit, state}, keywords,callback){
    const geohash = state.latitude + ',' + state.longitude
    reqSearchShop(geohash, keywords).then( res => {
      if( res.code === 0){
        const searchShops = res.data
        commit(RECEIVE_SEARCH_SHOP, {searchShops})
        callback && callback()
      }
    })
  },
}
