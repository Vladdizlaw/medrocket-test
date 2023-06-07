import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/catalogue',
    name: 'catalogue',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CatalogueView.vue'),
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/FavoritesView.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
