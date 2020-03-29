<template>
<card-btn>
    <div v-for="item in detailData" :key="item._id">
        <span v-html="item.data"></span>
    </div> 
</card-btn>
</template>
<script>
import {queryList} from '../../../api/article'
export default {
    name:'articleListDetail',
    data(){
        return {
            detailData:[]
        }
    },
    created(){
        const id = this.$route.query.id
        queryList({'id':id}).then(res=>{
            this.detailData = res.data
        })
    }
}
</script>