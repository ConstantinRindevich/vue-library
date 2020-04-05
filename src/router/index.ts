import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/views/Search.vue'
import {pages} from '@/services/const'

Vue.use(VueRouter)

const routes = [
  {
    ...pages.searchPage,
    component: Search
  },
  {
    ...pages.favoritesPage,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Favorites.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
