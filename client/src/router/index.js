import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shabat from '../views/Shabat.vue'
import SingleDate from '../views/SingleDate.vue'
import Reminders from '../views/Reminders.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/reminders',
    name: 'Reminders',
    component: Reminders,
    props: true
  },
  {
    path: `/saturdays`,
    name: 'Shabat',
    component: Shabat
  },

  {
    path: `/:date`,
    name: 'SingleDate',
    component: SingleDate,
    props: true
  }

  // {
  //   path: '/shabatot',
  //   name: 'Shabat',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Shabat.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
