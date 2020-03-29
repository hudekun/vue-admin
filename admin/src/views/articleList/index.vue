<template>
    <card-btn>
        <ul v-if="dataList.length">
            <li v-for="item in dataList" :key="item._id" class="itemList" @click="handelItemDetail(item._id)">
                <span v-html="item.data"></span>
            </li> 
        </ul>
        <div v-else>
            <h2>暂无数据</h2>
        </div>
    </card-btn>
</template>
<script>
import Card from '../../components/card/index'
import {queryList} from '../../api/article'
export default {
    name:'articleList',
    data(){
        return {
            dataList:[]
        }
    },
   methods:{
       handelQurey(){
           queryList().then(res=>{
               this.dataList = res.data
           })
       },
       handelItemDetail(id){
           this.$router.push({path:'/articleListDetail',query:{'id':id}})
       }
   },
   created(){
       this.handelQurey()
   }
}
</script>
<style lang="less" scoped>
.itemList{
    border: 1px solid;
    margin-bottom: 10px;
    padding: 0 10px;
    border-radius: 5px;
    height: 53px;
    overflow: hidden;
}
</style>