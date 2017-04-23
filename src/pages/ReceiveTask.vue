<template>
    <div>
        <div class="text-center">
            <text>接收通知</text>
        </div>
            <list-item v-for="(item,index) in tasks" :key="index" bg-color="#E8F5E9">
                <text>{{item.title}}</text>
                <text>{{item.content}}</text>
            </list-item>
    </div>
</template>


<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                tasks:[],
            }
        },
        methods:{
            getTasks(){
                var tvm = this;
                axios.get('http://zhiliao.server.zhaokuo.cc/api/Task/tasklist').then(function(res){
                    if(res.data.res == 'true'){
                        tvm.tasks = res.data.data
                        // console.log(tvm.tasks)
                    }
                }).catch(function(response){
                    // console.error(response)   
                })
            },
        },
        mounted () {
            // console.log("开始请求任务列表");
            this.getTasks();
        },
        components: {
            'list-item': require('../component/list-item.vue')
        }
    }
</script>