import App from './App.vue'
import Router from 'vue-router'
import axios from 'axios'


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
  {
    path:'/login',
    component:require('./pages/Login.vue')
  }
];

var router = new Router({routes});

export default new Vue({
  el: '#root',
  router,
  render: h => h(App)
});
