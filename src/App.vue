<template>
  <div class="wrapper" @click="update">
    <image :src="logoUrl" class="logo"></image>
    <router-view></router-view>
    <div class="footer">
        <div class="footer-item">
          <router-link to='/'>
            <text class="text-center">接收通知</text>
          </router-link>
        </div>
        <div class="footer-item">
          <router-link to='/sendtask'>
            <text class="text-center">发送通知</text>
          </router-link>
        </div>
        <div class="footer-item">
          <router-link to="/joingroup">
            <text class="text-center">加入群</text>
          </router-link>
        </div>
        <div class="footer-item">
          <router-link to="/login">
            <text class="text-center">登录</text>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        logoUrl: 'http://zhiliao-10068775.cos.myqcloud.com/favicon.ico',
      }
    },
    methods: {
      update: function (e) {
        this.target = 'Weex'
        // console.log('target:', this.target)
      }
    }
  }
</script>

<style>
  .wrapper { align-items: center; padding-top: 120px; }
  .title { font-size: 48px; }
  .logo { width: 200px; height: 200px; }
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