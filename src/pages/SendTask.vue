<template>
    <div>
        <text>发送通知 - 测试</text>
        <image style="width:100px; height:100px;" :src="user.imagePath"></image>
        <text>{{user.id}}</text>
        <text>{{user.nickname}}</text>
        <text>{{user.password}}</text>
        <text>{{user.summary}}</text>
        <text>{{user.phoneNum}}</text>
        <text>{{user.email}}</text>
    </div>
</template>
<script>
    var stream = weex.requireModule('stream')
    export default {
        data(){
            return{
                user:{}
            }
        },
        methods:{
            sendTask(){
                let tvm = this;
                stream.fetch({
                    url:'http://zhiliao.server.zhaokuo.cc/api/Values',
                    method:'GET',
                    type:'json',
                },function(res){
                    tvm.user = res.data;
                });
            }
        },
        mounted () {
            this.sendTask();
        },
    }
</script>