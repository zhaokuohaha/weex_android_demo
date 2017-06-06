<template>
    <div>
        <div class="blank"></div>
        <div class="st-header">
            <text class="st-text-title">发送通知</text>
        </div>
        <div class="st-form-wrapper">
            <div class="st-form-row">
                <div class="st-form-label">
                    <text class="text-label">标题</text>
                </div>
                <div class="st-form-right">
                    <input  class="st-form-input" type="text" v-model="task.title" />
                </div>
            </div>
            <div class="st-form-row">
                <div class="st-form-label">
                    <text class="text-label">时间</text>
                </div>
                <div class="st-form-right">
                    <input class="st-form-input" type="text" v-model="task.time" />
                </div>
            </div>
            <div class="st-form-row">
                <div class="st-form-label">
                    <text class="text-label">地址</text>
                </div>
                <div class="st-form-right">
                    <input class="st-form-input" type="text" v-model="task.address" />
                </div>
            </div>
            <div class="st-form-row">
                <div class="st-form-label">
                    <text class="text-label">内容</text>
                </div>
                <div class="st-form-right">
                    <textarea class="st-form-input" v-model="task.content"></textarea>
                </div>
            </div>
            <div class="st-form-row">
                <div class="st-form-label">
                    <text class="text-label">群</text>
                </div>
                <div class="st-form-right">
                    <div class="st-form-input">
                        <div class="st-list-item st-selected" v-for="(group,index) in selectgroups" :key="index">
                            <text>{{group}}</text>
                        </div>
                    </div>
                    <span class="st-list-item st-unselected" @click="addGroup(group,index)" v-for="(group,index) in mygroups" :key="index">
                        <text>{{group.name}}</text>
                    </span>
                </div>
            </div>
            
            <div style="margin-top:10px;margin-left:-50px; margin-bottom:20px;width:650px;border-top-width:2px;border-top-color:#aaa;"></div>
            <div class="st-switch-wrapper">
                <text>使用短信发送</text>
                <switch @change="toggleSms"></switch>
            </div>
            <div class="st-switch-wrapper">
                <text>使用邮件发送</text>
                <switch @change="toggleEmail"></switch>
            </div>
            <image src="http://zhiliao-10068775.cossh.myqcloud.com/send.png"
            style="width:128px; height:128px;"
            @click="sendTask"></image>
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
            return{
                mygroups:[],
                selectgroups:[],
                task:{
                    title:'',
                    date:'',
                    time:'',
                    address:'',
                    content:'',
                    isemail:true,
                    issms:false,
                    group:[],
                },
            }
        },
        methods:{
            getToken(){
                let tvm = this;
                 storage.getItem('token',function(e){
                    if(e.result=='success'){
                        $token = e.data;
                        tvm.getGroups();
                    }else{
                        this.$router.push('/login')
                    }
                })
            },
            getGroups(){
                let tvm = this;
                 stream.fetch({
                    method:'GET',
                    headers :{
                        'Content-Type':'application/json',
                        'Authorization':$token,
                    },
                    type:'json',
                    url:'http://zhiliao.server.zhaokuo.cc/api/Group/groupList'
                },function(res){
                    if(res.data.res === 'true'){
                        let gls = res.data.data
                        for(let i=0; i<gls.length; i++){
                            if(gls[i].ismine == true){
                                tvm.mygroups.push(gls[i])
                            }
                        }
                    } 
                    else{
                        modal.toast({
                            message:'请求群列表失败',
                            duration :5
                        })
                    }
                })
            },
            toggleSms(e){
                this.task.issms = e.value;
            },
            toggleEmail(e){
                this.task.isemail = e.value;
            },
            addGroup(item,index){
                this.selectgroups.push(item.name)
                this.task.group.push(item.groupid)
                this.mygroups.splice(index,1);
            },
            sendTask(){
                let tvm = this;
                stream.fetch({
                    method:'POST',
                    headers :{
                        'Content-Type':'application/json',
                        'Authorization':$token,
                    },
                    type:'json',
                    url:'http://zhiliao.server.zhaokuo.cc/api/Task/createtask',
                    body:JSON.stringify(tvm.task)
                },function(res){
                    if(res.ok == true){
                        modal.toast({
                            message:'通知发送成功, 您可以在web端管理已发送的通知',
                            duration:5
                        });
                    }else{
                        modal.toast({
                            message:'通知发送失败, 请查看通知配置, 或联系管理员',
                            duration:5
                        });
                    }
                })
            }
        },
        mounted () {
            this.getToken()
        },
    }
</script>

<style>
.st-header{
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 50px;
}
.st-text-title{
    flex: 1;
    text-align: center;
    font-size: 50px;
}

.st-form-wrapper{
    flex-direction: column;
    justify-content: center;
    margin-left: 50px;
}

.st-form-row{
    width: 480px;
    margin-left: 20px;
}

.st-form-row{
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
}

.st-formlabel{
    justify-content: flex-start;
    align-items: center;
}

.st-form-right{
    justify-content: flex-start;
    flex:1;
}

.st-form-input{
    font-size: 30px;
    flex:1;
    margin-top: 5px;
    margin-bottom: 10px;
    margin-left: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    color: #666666;
    border-width: 2px;
    border-style: solid;
    border-color: #008080;
    border-radius: 5px;
}

.st-btn-send{
    border-radius: 2px;
    height: 64px;
    width: 192px;
    border: none;
    margin-top: 20px;
    outline: 0;
    justify-content:center;
    align-items: center;  
}
.st-list-item{
    margin-left: 10px;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    
}
.st-unselected{
    background-color: #e0e0e0;
}

.st-selected{
    background-color: #69f0ae;
}

.st-switch-wrapper{
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>