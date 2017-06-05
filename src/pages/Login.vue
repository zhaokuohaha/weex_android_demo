<template>
    <div style="justify-content:center;">
        <div class="lg-avater-wrapper">
            <image style="width:200px; height:200px;" :src="userinfo.avatar"></image>
        </div>
        <div v-if="!islogin" class="lg-center-wrapper">
            <text class="lg-text-title">用户登录</text>
            <input class="lg-form-input" type="text" v-model="account.email" /> <br />
            <input class="lg-form-input" type="password" v-model="account.password" />
            <button class="lg-btn lg-btn-primary lg-text-center" @click="login()">
                <text class="lg-text-primary">登录</text>
            </button>
        </div>
        <div  v-else style="align-items:center;">
            <text class="lg-text-title">{{userinfo.nickname}}</text>
            <text class="lg-text-title">{{userinfo.summary}}</text>
        </div>
    </div>
</template>

<script>
    var stream = weex.requireModule('stream')
    var storage = weex.requireModule('storage')
    var modal = weex.requireModule('modal')

    export default {
        data() {
            return {
                account:{
                    email: '1014336691@qq.com',
                    password: '123qwe'
                },
                islogin:false,
                userinfo:{
                    avatar:'http://zhiliao.vue.yyonghua.com/static/img/zhiliao-green.6b1aecf.png'
                },
            }
        },
        methods:{
            login(){
                let tvm = this;
                
                stream.fetch({
                    method:'POST',
                    headers :{
                        'Content-Type':'application/json'
                    },
                    type:'json',
                    body:JSON.stringify(tvm.account),
                    url:'http://zhiliao.server.zhaokuo.cc/api/Account/login'
                },function(res){
                    tvm.userinfo = res.data
                    storage.setItem('token','Bearer '+res.data.access_token);
                    tvm.islogin = true
                    modal.toast({
                        message:'登录成功',
                        duration:3
                    });
                });
            }
        }
    }

</script>

<style>
    .lg-avater-wrapper{
        flex-direction: row;
        justify-content: center;
        margin-top: 120px;
        width:750px;
    }
    .lg-btn{
        border-radius: 2px;
        height: 64px;
        min-width: 128px;
        border: none;
        margin-top: 20px;
        outline: 0;
        justify-content:center;
        align-items: center;    
    }

    .lg-btn-default{
        background-color: #fff;
        color: rgba(0,0,0,.87);
    }
    .lg-btn-primary{
        background-color: #81D4FA;
        color:#fff;
    }
    .lg-center-wrapper{
        align-items: center;
        justify-content: center;
    }
    .lg-form-input{
        font-size: 30px;
        width: 600px;
        margin-top: 5px;
        margin-bottom: 20px;
        margin-left: 50px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        color: #666666;
        border-width: 2px;
        border-style: solid;
        border-color: #41B883;
        border-radius: 5px;
    }

    .lg-text-primary{
        font-size: 35px;
        text-align: center;
    }

    .lg-text-title{
        font-size: 50px;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>