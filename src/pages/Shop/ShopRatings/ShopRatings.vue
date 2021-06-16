<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ shop_info.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ shop_info.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="shop_info.serviceScore" :size="36"/>
            <span class="score">{{ shop_info.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="shop_info.foodScore" :size="36"/>
            <span class="score">{{ shop_info.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ shop_info.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" @click="setSelectType(2)" :class="{active: selectType === 2}">
            全部<span class="count">{{ shop_ratings.length }}</span>
          </span>
          <span class="block positive" @click="setSelectType(0)" :class="{active: selectType === 0}">
            满意<span class="count">{{ positiveSize }}</span>
          </span>
          <span class="block negative" @click="setSelectType(1)" :class="{active: selectType === 1}">
            不满意<span class="count">{{ shop_ratings.length - positiveSize }}</span>
          </span>
        </div>
        <div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
          <span class="iconfont icon-checkcircle"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(item,index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="item.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{ item.username }}</h1>
              <div class="star-wrapper">
                <Star :score="item.score" :size="24"/>
                <span class="delivery">{{ item.score }}</span>
              </div>
              <p class="text">{{ item.text }}</p>
              <div class="recommend">
                <span class="iconfont" :class="item.rateType===0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
                <span class="item" v-for="(food, index) in item.recommend" :key="index">{{ food }}</span>
              </div>
              <div class="time">{{ item.rateTime | date-format }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import Star from "@/components/Star/Star";
import {mapState, mapGetters} from 'vuex'
import BScroll from 'better-scroll'

export default {
  name: "ShopGoods",
  data() {
    return {
      onlyShowText: true, //是否只显示有文本的
      selectType: 2,  //选择的评价类型： 0满意，1不满意，2全部
    }
  },
  components: {
    Star
  },
  computed: {
    ...mapState(['shop_info', 'shop_ratings']),
    ...mapGetters(['positiveSize']),

    filterRatings() {
      //产生一个过滤新数组
      return this.shop_ratings.filter(ratings => {
        /*
        * 条件1
        *
        * 条件2
        * */

        // if (this.selectType === ratings.rateType) {
        //   if (this.onlyShowText) {
        //     return ratings.text.length > 0 && this.selectType === ratings.rateType
        //   }
        //   return this.selectType === ratings.rateType
        // } else if (this.selectType === 2) {
        //   if (this.onlyShowText) {
        //     return ratings.text.length > 0
        //   }
        //   return ratings
        // }

        /*
        * 简洁的写法
        * */
        return (this.selectType === 2 || this.selectType === ratings.rateType) && (!this.onlyShowText || ratings.text.length > 0)

      })
    }
  },
  mounted() {
    this.$store.dispatch('getShopRatings', () => {
      this.initScroll()
    })
  },
  methods: {
    setSelectType(type) {
      this.selectType = type
      this.initScroll()
    },
    toggleOnlyShowText() {
      this.onlyShowText = !this.onlyShowText
      this.initScroll()
    },
    initScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll('.ratings', {
            click: true
          })
        }
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"

.ratings
  position: absolute
  top: 195px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  background: #fff

  .overview
    display: flex
    padding: 18px 0

    .overview-left
      flex: 0 0 137px
      padding: 6px 0
      width: 137px
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      text-align: center
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px

      .score
        margin-bottom: 6px
        line-height: 28px
        font-size: 24px
        color: rgb(255, 153, 0)

      .title
        margin-bottom: 8px
        line-height: 12px
        font-size: 12px
        color: rgb(7, 17, 27)

      .rank
        line-height: 10px
        font-size: 10px
        color: rgb(147, 153, 159)

    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left: 6px

      .score-wrapper
        margin-bottom: 8px
        font-size: 0

        .title
          display: inline-block
          line-height: 18px
          vertical-align: top
          font-size: 12px
          color: rgb(7, 17, 27)

        .star
          display: inline-block
          margin: 0 12px
          vertical-align: top

        .score
          display: inline-block
          line-height: 18px
          vertical-align: top
          font-size: 12px
          color: rgb(255, 153, 0)

      .delivery-wrapper
        font-size: 0

        .title
          line-height: 18px
          font-size: 12px
          color: rgb(7, 17, 27)

        .delivery
          margin-left: 12px
          font-size: 12px
          color: rgb(147, 153, 159)

  .split
    width: 100%
    height: 16px
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    background: #f3f5f7

  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      //border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0

      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)

        &.active
          background: $green
          color: #fff

        .count
          margin-left: 2px
          font-size: 8px

    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      display flex
      align-items center

      &.on
        .icon-checkcircle
          background $green
          width 10px
          height 10px
          border-radius 10px

      .icon-checkcircle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
        width 10px
        height 10px
        border-radius 10px
        border 1px solid #999

      .text
        display: inline-block
        vertical-align: top
        font-size: 12px

  .rating-wrapper
    padding: 0 18px

    .rating-item
      display: flex
      padding: 18px 0
      bottom-border-1px(rgba(7, 17, 27, 0.1))

      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px

        img
          border-radius: 50%

      .content
        position: relative
        flex: 1

        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rgb(7, 17, 27)

        .star-wrapper
          margin-bottom: 6px
          font-size: 0

          .star
            display: inline-block
            margin-right: 6px
            vertical-align: top

          .delivery
            display: inline-block
            vertical-align: top
            height: 12px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)

        .text
          margin-bottom: 8px
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px

        .recommend
          line-height: 16px
          font-size: 0

          .icon-thumb_up, .icon-thumb_down, .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px

          .icon-thumb_up
            color: $yellow

          .icon-thumb_down
            color: rgb(147, 153, 159)

          .item
            padding: 0 6px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff

        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
</style>

