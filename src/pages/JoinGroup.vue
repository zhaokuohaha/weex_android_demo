<template>
    <div class="wrapper">
        <div class="jg-title-wrapper">
            <text class="jg-text-title">加入群</text>
        </div>
        <div class="jg-form-wrappe">
            <div class="jg-form-row">
                <div class="jg-form-label">
                    <text class="text-label">群名称</text>
                </div>
                <div class="jg-form-right">
                    <input  class="jg-form-input" type="text" v-model="group" />
                </div>
            </div>
            <div class="jg-form-row">
                <div class="jg-form-label">
                    <text class="text-label">群口令</text>
                </div>
                <div class="jg-form-right">
                    <input class="jg-form-input" type="text" v-model="seckey" />
                </div>
            </div>
            <button class="jg-btn jg-btn-primary" @click = "joinGroup">
                <text style="text-align:center;">确认加入</text>
            </button>
        </div>
    </div>

</template>

<script>
    var stream = weex.requireModule('stream')
    var storage = weex.requireModule('storage')
    var modal = weex.requireModule('modal')
    var $token='';


    export default {
        data(){
            return {
                group:'测试群',
                seckey:'1234'
            }
        },
        methods:{
            getToken(){
                let tvm = this;
                 storage.getItem('token',function(e){
                    if(e.result=='success'){
                        $token = e.data;
                    }else{
                        this.$router.push('/login')
                    }
                })
            },
            joinGroup(){
                let tvm = this;
                stream.fetch({
                    method:'POST',
                    headers :{
                        'Content-Type':'application/json',
                        'Authorization':$token,
                    },
                    type:'json',
                    url:'http://zhiliao.server.zhaokuo.cc/api/Group/joingroup',
                    body: JSON.stringify({groupName:tvm.group, secKey:tvm.seckey})
                },function(res){
                    // console.log(res);
                    if(res.ok){
                        if(res.data.res == true){
                            modal.toast({
                                message:'加入成功, 您将会自动收到本群消息. 同时您可以在web端查看您的群.',
                                duration:5
                            });    
                        }else{
                            modal.toast({
                                message:res.data.data,
                                duration:5
                            });
                        }
                    }else{
                        modal.toast({
                            message:'操作失败, 请尝试在web端操作或联系管理员',
                            duration:3
                        });
                    }
                })
            }
        },
        mounted(){
            this.getToken();
        }
    }
</script>

<style>
    .jg-title-wrapper{
        justify-content: center;
        align-content: center;
    }
    .jg-text-title{
        flex: 1;
        font-size: 50px;
        text-align: center;
    }

    .jg-form-wrapper{
        flex-direction: column;
        align-items: center;
    }
    .jg-form-row{
        flex-direction: row;
    }
    .jg-form-label{
        flex: 1;
        justify-content: center;
    }
    .jg-form-right{
        flex: 3;
    }
    .jg-form-input{
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
        border-color: #81D4FA;
        border-radius: 5px;
    }
    .jg-btn{
        height: 64px;
        min-width: 128px;
        border: none;
        margin-top: 20px;
        outline: 0;
        justify-content:center;
        align-items: center;    
    }

    .jg-btn-default{
        background-color: #fff;
        color: rgba(0,0,0,.87);
    }
    .jg-btn-primary{
        background-color: #81D4FA;
        color:#fff;
    }
</style>