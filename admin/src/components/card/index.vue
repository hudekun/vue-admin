<template>
    <div class="card_con">
        <el-card>
            <slot></slot>
        </el-card>
    </div>
</template>
<script>
export default {
    name:'card-btn'
}
</script>
<style lang="less" scoped>
.card_con{
    padding: 10px 0;
}
</style>