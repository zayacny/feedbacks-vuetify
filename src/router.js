import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './components/HomePage'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/about',
      component: () => import('./components/About') /// home/developer/Vuetify Projects/feedbacks-vuetify/src/components/About.vue
    },
    {
      path: '/write-review',
      component: () => import('./components/FormReview')
    },
    {
      path: '/donefeedback',
      component: () => import('./components/DoneFeedback')
    },
    {
      path: '/allfeedbacks',
      component: () => import('./components/AllFeedbacks')
    },
    {
      path: '/authentication',
      component: () => import('./components/Authentication')
    },
    {
      path: '/registration',
      component: () => import('./components/Registration')
    },
    {
      path: '/recover',
      component: () => import('./components/Recover')
    },
    {
      path: '/recover/:token',
      component: () => import('./components/NewPass')
    }
  ]
})
