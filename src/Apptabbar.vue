<template>
  <div class="wrapper">
    
    <router-view></router-view>
    <tabbar :tabItems="tabitems" @tabBarOnClick="jump"></tabbar>
    <!--<div class="footer">
        <div class="footer-item" @click="jump('')">
            <text class="text-center">接收通知</text>
        </div>
        <div class="footer-item" @click="jump('sendtask')">
            <text class="text-center">发送通知</text>
        </div>
        <div class="footer-item" @click="jump('joingroup')">
            <text class="text-center">加入群</text>
        </div>
        <div class="footer-item" @click="jump('login')">
            <text class="text-center">登录</text>
        </div>
    </div>-->
  </div>
</template>

<script>
  // import router from 'vue-router'
  export default {
    data(){
      return{
        logoUrl: 'http://zhiliao-10068775.cos.myqcloud.com/favicon.ico',
        tabitems:[{
          index:0,
          title:'接收通知',
          
          image:'http://zhiliao.vue.yyonghua.com/static/img/zhiliao-green.6b1aecf.png',
          src:''
        },{
          index:1,
          title:'发送通知',
          image:'http://zhiliao-10068775.file.myqcloud.com/68abc327-4e78-4e87-b995-74559d19b2c7.jpg',
          src:'sendtask'
        },{
          index:2,
          title:'加入群',
          image:'http://zhiliao.vue.yyonghua.com/static/img/zhiliao-green.6b1aecf.png',
          src:'joingroup'
        },{
          index:3,
          title:'登录',
          image:'http://zhiliao-10068775.file.myqcloud.com/68abc327-4e78-4e87-b995-74559d19b2c7.jpg',
          src:'login'
        }]
      }
    },
    methods: {
        jump: function(e) {
          let path = this.tabitems[e.index].src;
          this.$router.push(path); 
        }
    },
    components:{
      'tabbar':require('./components/tabbar.vue')
    }
  }
</script>

<style>
  .wrapper { align-items: stretch; }
  .title { font-size: 48px; }
  .footer{
    position: fixed;
    bottom: 0;
    flex-direction: row;
    width:750px;
    height:120px;
    background-color: #65D4FA;
  }

  .footer-item{
    padding-top:10px;
    padding-bottom:10px;
    justify-content:center;
    flex:1;
    text-align: center;
  }


  .text-center{
    align-items: center;
    text-align: center;
    justify-content:center;
  }
</style>