<template>
    <div>
        <div v-if="!islogin" class="text-center">
            <text>用户登录</text>
            <input class="form-input" type="text" v-model="account.email" /> <br />
            <input class="form-input" type="password" v-model="account.password" />
            <button class="btn btn-primary text-center" @click="login()">
                <text class="text-center">登录</text>
            </button>
        </div>
        <div  v-else style="justify-content:center;">
            <image style="width:100px; height:100px;" :src="userinfo.avatar"></image>
            <text>{{userinfo.nickname}}</text>
            <text>{{userinfo.summary}}</text>
        </div>
    </div>
</template>

<script>
    var stream = weex.requireModule('stream')
    export default {
        data() {
            return {
                account:{
                    email: '1014336691@qq.com',
                    password: '123qwe'
                },
                islogin:false,
                userinfo:{},
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
                    tvm.userinfo = res.data;
                    // axios.defaults.headers.common['Authorization'] = "Bearer "+res.data.access_token;
                    tvm.islogin = true;
                });
            }
        }
    }

</script>

<style>
    .btn{
        border-radius: 2px;
        height: 64px;
        min-width: 128px;
        border: none;
        margin-top: 20px;
        outline: 0;
        justify-content:center;
        align-items: center;        
    }

    .btn-default{
        background-color: #fff;
        color: rgba(0,0,0,.87);
    }
    .btn-primary{
        background-color: #81D4FA;
        color:#fff;
    }
    .text-center{
        align-items: center;
        text-align: center;
    }
    .form-input{
        display: block;
        border-radius: 10px;
        height: 64px;
        border-color: #81D4FA;
        margin-bottom: 10px;
        margin-top: 20px;
    }
</style>