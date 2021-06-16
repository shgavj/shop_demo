<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <!-- 菜单对应的是食物分类列表-->
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in shop_goods" :key="index"
              :class="{current: index===currentIndex}"
              @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" v-lazy="good.icon" v-if="good.icon">
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <!-- 右侧的食物列表是根据左侧的分类列表展现的-->
        <!-- 所以右侧是在一个分类标题列表里面嵌套着各类食物列表-->
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in shop_goods" :key="index">
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(item, index) in good.foods"
                  :key="index" @click="showFood(item)">
                <div class="icon">
                  <img width="57" height="57" v-lazy="item.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{ item.name }}</h2>
                  <p class="desc">{{ item.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ item.sellCount }}份</span>
                    <span>好评率{{ item.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ item.price }}</span>
                    <span class="old" v-if="item.oldPrice">￥{{ item.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="item"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Food :food="food" ref="food"/>
    <ShopCart/>
  </div>

</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from "@/components/CartControl/CartControl";
import Food from "@/components/Food/Food";
import ShopCart from "@/components/ShopCart/ShopCart";
export default {
  name: "ShopGoods",
  data() {
    return {
      scrollY: 0, //右侧滑动的Y轴坐标（滑动时实时变化）
      tops: [], //所有右侧分类的li的top组成的数组（列表第一次显示后就不再变化）
      food:{} //传给food组件的对象
    }
  },
  components:{
    CartControl,Food,ShopCart
  },
  mounted() {
    this.$store.dispatch('getShopGoods', () => {
      this.$nextTick(() => {//数据列表更新显示后执行
        this._initScroll()
        this._initTops()
      })
    })

  },
  computed: {
    ...mapState(['shop_goods']),
    // 计算得到当前分类的下标
    currentIndex() { // 初始和相关数据发生了变化
      // 得到条件数据
      const {scrollY, tops} = this
      // 根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        // scrollY>=当前top && scrollY<下一个top
        return scrollY >= top && scrollY < tops[index + 1]
      })
      // 返回结果(也就是当前的scrollY值属于第几个li区间)
      return index
    }
  },
  methods: {
    //初始化滑动组件
    _initScroll() {
      new BScroll('.menu-wrapper', {
        probeType: 2, //惯性不会触发
        click: true
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 2
      })
      // 给右侧列表绑定scroll监听
      this.foodsScroll.on('scroll', ({y}) => {
        this.scrollY = Math.abs(y)
      })
      // 给右侧列表绑定scroll结束的监听
      this.foodsScroll.on('scrollEnd', ({y}) => {
        this.scrollY = Math.abs(y)
      })
    },
    //初始化tops
    _initTops() {
      //1.初始化tops
      let top = 0
      this.tops.push(top)
      //2.收集
      //找到所有分类的li
      const lis = this.$refs.foodsUl.children
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        this.tops.push(top)
      })
    },
    clickMenuItem(index){
      console.log(index)
      //使用右侧列表滑动到对应的位置
      //得到目标位置的scrollY
      const scrollY = this.tops[index]
      //立即更新scrollY(让点击的分类项成为当前分类)
      this.scrollY = scrollY
      //平滑滑动右侧
      this.foodsScroll.scrollTo(0, -scrollY, 500)
    },
    showFood(food){
      //设置food
      this.food = food
      //显示food窗口
      this.$refs.food.isShowFoodHandle()
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.goods
  display: flex
  position: absolute
  top: 195px
  bottom: 46px
  width: 100%
  background: #fff;
  overflow: hidden

  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7

    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px

      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        color: $green
        font-weight: 700

        .text
          border-none()

      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat

      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px

  .foods-wrapper
    flex: 1

    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7

    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))

      &:last-child
        border-none()
        margin-bottom: 0

      .icon
        flex: 0 0 57px
        margin-right: 10px

      .content
        flex: 1

        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)

        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)

        .desc
          line-height: 12px
          margin-bottom: 8px

        .extra
          .count
            margin-right: 12px

        .price
          font-weight: 700
          line-height: 24px

          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)

          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)

        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>

