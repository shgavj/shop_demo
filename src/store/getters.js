// 包含多个基于state的getter计算属性
export default {
  totalCount(state){
    return state.cartFoods.reduce( (pre, cur) => {
      return pre + cur.count
    }, 0)
  },
  totalPrice(state){
    return state.cartFoods.reduce( (pre, cur) => {
      return pre + cur.count*cur.price
    }, 0)
  },
  positiveSize(state){
    return state.shop_ratings.reduce((pre, cur) => {
      return pre + (cur.rateType===0?1:0)
    },0)
  }
}
