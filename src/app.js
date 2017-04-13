import Vue from 'vue'
import Router from 'vue-router'

import App from './index.vue'

Vue.use(Router)

const routes = [
  {
    path:'/',
    component:require('./pages/ReceiveTask.vue')
  },
  {
    path:'/sendtask',
    component:require('./pages/SendTask.vue')
  },
  {
    path:'/joingroup',
    component:require('./pages/JoinGroup.vue')
  },
]


var router = new Router({routes});
new Vue({
  el: '#root',
  router,
  render: h => h(App)
})
