<template>
    <card-btn>
        <Editor @sendMsg ="handelMsg"></Editor>
        <div class="submit">
             <el-button type="primary" @click="handelSub()">提交</el-button>
        </div>
    </card-btn>
</template>
<script>
import Editor from '../../components/Ue/index'
import {submitData} from '../../api/article'
import {mapState} from 'vuex'
export default {
    name:'writeArticle',
    components: {Editor},
    data(){
        return{
            content:null,
            editorOption:{}
        };
    },
     computed: {
        ...mapState({
            loading: state=>state.loading,
           inputMsg:state=>state.inputMsg
        })
    },
    methods:{
        handelMsg(val){
            this.content = val
        },
        handelSub(){
            const val = !this.inputMsg
            const name = sessionStorage.getItem('username')
            
            submitData({'content':this.content,'name':name}).then(res=>{
                this.$message({
                message: res.msg,
                type: 'success'
                })
                this.$store.commit('clearMsg', val);
            })
        }
    }
}
</script>
<style lang="less" scoped>
 .submit{
     margin: 15px 0;
     padding:0 10px;
     display: flex;
     justify-content: flex-end;
 }
 
</style>