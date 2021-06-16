import Vue from 'vue'
// 直接更新state的多个方法对象
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
export default {
  [RECEIVE_ADDRESS] (state, {address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOS] (state, {shops}){
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state){
    state.userInfo = {}
  },
  [RECEIVE_SHOP_GOODS] (state, {shop_goods}){
    state.shop_goods = shop_goods
  },
  [RECEIVE_SHOP_RATINGS] (state, {shop_ratings}){
    state.shop_ratings = shop_ratings
  },
  [RECEIVE_SHOP_INFO] (state, {shop_info}){
    state.shop_info = shop_info
  },
  [INCREMENT_FOOD_COUNT] (state, {food}){
   if (!food.count){  //第一次增加
     // food.count = 1
     /*
        对象
        属性名
        属性值
     * */
     Vue.set(food, 'count', 1)  //让新增的属性也有数据绑定
     state.cartFoods.push(food)
   }else {
     food.count++
   }
  },
  [DECREMENT_FOOD_COUNT] (state, {food}){
    if (food.count){  //有值的时候才去减
      food.count --
      if (food.count === 0){
        //将food从cartfoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART] (state){
    //去除所有food的count属性
    state.cartFoods.forEach(food => food.count = 0)
    //然后再清空cartFoods
    state.cartFoods = []
  },
  [RECEIVE_SEARCH_SHOP] (state, {searchShops}){
    state.searchShops = searchShops
  },
}
