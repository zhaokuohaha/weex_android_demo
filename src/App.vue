<template>
  <div class="wrapper">
    
    <router-view></router-view>
    <div style="height:128px;"></div>
    <div class="footer">
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
    </div>
  </div>
</template>

<script>
  // import router from 'vue-router'
  export default {
    data(){
      return{
        logoUrl: 'http://zhiliao-10068775.cos.myqcloud.com/favicon.ico',
      }
    },
    methods: {
        jump(path){
          this.$router.push('/'+path); 
        }
    }
  }
</script>

<style>
  .wrapper { align-items: center; padding-top: 120px; }
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