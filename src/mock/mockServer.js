/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/shop_goods',{code:0,data: data.goods})
Mock.mock('/shop_ratings',{code:0,data: data.ratings})
Mock.mock('/shop_info',{code:0,data: data.info})

//不用向外暴露，但是需要在入口文件引入main.js
