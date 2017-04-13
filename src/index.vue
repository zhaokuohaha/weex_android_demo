<template>
  <div class="container">
      <image src="http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/7d42775b8f0d0c86589082dc9ee179c2.png" class="bannar-image"/>
      <text @click="changeMessage" class="message">{{ message }}</text>
      <text class="quotes">{{ quotes }}</text>
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
      </div>
  </div>
</template>

<style>
  .footer{
    position: fixed;
    bottom: 0;
    display: inline-block;
    text-align: center;
    width: 100%;
    background-color: #81d4fa;
  }

  .footer-item{
    display: inline-block;
    padding: 10px;
    width: 30%;
    text-align: center;
  }

  .text-center {
    text-align: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bannar-image {
    width: 200px;
    height: 200px;
  }

  .message {
    padding-top: 20px;
    padding-bottom: 40px;
    color: #0055dd;
    font-size: 28px;
  }

  .quotes {
    font-size: 16px;
    color: #666;
  }
</style>

<script>
  export default {
    data() {
      return {
        message: 'Welcome to Use Weexpack! ??',
        quotes: '唉, 怎么都不对'
      };
    },
    methods: {
      changeMessage() {
        this.message = 'You click it!';
      }
    }
  }
</script>
