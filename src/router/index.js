import Vue from 'vue'
import VueRouter from 'vue-router'

// import MSite from '../pages/MSite/MSite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
const MSite = () => import('../pages/MSite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')


import Login from "@/pages/Login/Login"
import Shop from "@/pages/Shop/Shop"
import ShopGoods from "@/pages/Shop/ShopGoods/ShopGoods"
import ShopRatings from "@/pages/Shop/ShopRatings/ShopRatings"
import ShopInfo from "@/pages/Shop/ShopInfo/ShopInfo"

Vue.use(VueRouter)

const routes = [
  {
    path: '/msite',
    name: 'MSite',
    component: MSite,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/',
    redirect: '/msite'
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        name: 'ShopGoods',
        component: ShopGoods
      },
      {
        path: '/shop/ratings',
        name: 'ShopRatings',
        component: ShopRatings
      },
      {
        path: '/shop/info',
        name: 'ShopInfo',
        component: ShopInfo
      },
      {
        path:'',  //单引号就可以
        redirect: '/shop/goods'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
