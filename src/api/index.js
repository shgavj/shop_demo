/*
  包含N个接口请求函数的模块
 */

import ajax from './ajax'
const BASE_URl = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = geohash => ajax(`${ BASE_URl }/position/${ geohash }`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URl + '/index_category')
// 3、根据经纬度获取商铺列表
export const  reqShops = (longitude,latitude) => ajax(BASE_URl + '/shops',{longitude,latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URl + '/search_shops', {geohash, keyword})
// 5、获取一次性验证码
// 6、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URl + '/login_pwd',  {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URl + '/sendcode', {phone})
// 8、手机号验证码登陆
export const reqPhoneLogin = (phone, code) => ajax(BASE_URl + '/login_sms', {phone,code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URl + '/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URl + '/logout')
// 11.商家食品列表
export const reqShopGoods = () => ajax('/shop_goods')
// 12.商家评价列表
export const reqShopRatings = () => ajax('/shop_ratings')
// 13.商家信息
export const reqShopInfo = () => ajax('/shop_info')
