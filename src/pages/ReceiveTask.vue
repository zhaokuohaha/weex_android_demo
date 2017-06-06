<template>
    <div>
        <div class="blank"></div>
        <div class="text-title-wrapper">
            <text class="text-title">接收通知</text>
        </div>
        <list>
            <cell v-for="(item,index) in tasks" :key="index" :class="[item.state?'task-readed':'task-unread','task-container']">
                <div class="task-header">
                    <div class="group-avatar">
                        <image style="width:100px; height:100px; border-radius:100px;" src="http://zhiliao-10068775.cos.myqcloud.com/group.png"></image>
                    </div>
                    <div class="group-name">
                        <text class="text-group-name">{{item.group}}</text>
                    </div>
                </div>
                <div class="task-body">
                    <div style="flex:1"></div>
                    <div class="task-content">
                        <text class="task-title">{{item.title}}</text>
                        <text class="task-detail">时间: {{item.time}}</text>
                        <text class="task-detail">地点: {{item.address}}</text>
                        <text class="task-detail">备注: {{item.content}}</text>
                    </div>
                    <div class="task-option">
                        <div @click="setReaded(item.id)" v-if="!item.state">
                            <image style="height:80px; width:80px;" src="http://zhiliao-10068775.cossh.myqcloud.com/check.png"></image>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>


<script>
    var stream = weex.requireModule('stream')
    var storage = weex.requireModule('storage')
    var modal = weex.requireModule('modal')

    var $token='';

    export default {
        data(){
            return{
                tasks:[],
            }
        },
        methods:{
            getToken(){
                let tvm = this;
                 storage.getItem('token',function(e){
                    if(e.result=='success'){
                        $token = e.data;
                        tvm.getTasks();
                    }else{
                        this.$router.push('/login')
                    }
                })
            },
            getTasks(){
                var tvm = this;
                stream.fetch({
                    method:'GET',
                    headers :{
                        'Content-Type':'application/json',
                        'Authorization':$token,
                    },
                    type:'json',
                    url:'http://zhiliao.server.zhaokuo.cc/api/Task/tasklist'
                },function(res){
                    // console.log(res);
                    if(!res.ok || !res.data.res){
                        modal.toast({
                            message:'请求数据失败, 请重新登录',
                            duration:8
                        });
                        tvm.$router.push('/login')
                        return
                    }
                    tvm.tasks = res.data.data
                });
            },
            setReaded(taskid){
                let tvm = this;
                stream.fetch({
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':$token
                    },
                    type:'json',
                    url:'http://zhiliao.server.zhaokuo.cc/api/Task/setreaded',
                    body:JSON.stringify({value:taskid})
                },function(res){
                    modal.toast({
                        message:'操作成功',
                        duration :5
                    });
                    tvm.getTasks();
                })
            }
        },
        mounted () {
           this.getToken();
        },
    }
</script>

<style>
.text-title-wrapper{
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 50px;
}
.text-title{
    flex:1;
    font-size: 50px;    
    text-align: center;
}
.task-container{
    flex-direction: column;
    background-color: #fff;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    overflow: visible;
}
.task-header{
    flex-direction: row;
    width: 720;
}
.group-avatar{
    flex:1;
    flex-direction:row;
    justify-content: center;
}
.group-name{
    flex:4;
    flex-direction:row;
    justify-content: flex-start;
}
.text-group-name{
    text-align: left;
    line-height: 100px;
    color: #bbb;
}

.task-body{
    flex-direction: row;
    width: 720;
}
.task-content{
    flex: 3;
    flex-direction: column;
}
.task-option{
    flex:1;
    justify-content: center;
    align-items: center;
}

.task-detail{
    font-size: 24px;
}

.task-readed{
    background-color: #e0f2f1;
}

.task-unread{
    background-color: #ffebee;
}
</style>