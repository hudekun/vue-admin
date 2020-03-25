<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadStyle">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in nameArr" :key="item.id">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: "BreadItem",
  data() {
    return {
      nameArr: []
    };
  },
  created() {
    this.nameArr.push(this.$route.name);
  },
  computed: {
    routerArr() {
      return this.$route.path.substr(1).split("/");
    }
  },
  watch: {
    $route(to, from) {
      var index = this.nameArr.indexOf(to.name);
      if (index !== -1) {
        this.nameArr.splice(index, 1);
      }
      if( this.nameArr.length > 5 ) {
          var firstIndex = this.nameArr.length-1
          this.nameArr.splice(firstIndex,1)
      }
      this.nameArr.push(to.name);
      console.log(this.nameArr);
    }
  }
};
</script>
<style lang="less" scoped>
.breadStyle{
    padding: 5px 0 10px 0;
    padding: 15px 0 10px 10px;
    background-color: #F2F2F2;
}
</style>