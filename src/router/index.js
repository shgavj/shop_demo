import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from "@/pages/Login/Login";

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
  }
]

const router = new VueRouter({
  routes
})

export default router
