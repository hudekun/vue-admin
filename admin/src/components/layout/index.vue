<template>
  <div class="pages_content">
    <el-container>
      <el-header>
        <div class="fl" :span="9">
        <el-col :span="4" class="iconFloat border_Right">
          <img src="../../assets/img/logo.png" alt="" style="width:50%;height:100%" />
        </el-col>
        <el-col :span="3" class="iconFloat">
          <el-button type="primary" :icon="icons" circle @click="handelCal()"></el-button>
        </el-col>
        </div>
        <el-col class="fr" :span="6">
        <el-button type="primary" size="small" @click="loginOut()">退出</el-button>
        <el-button type="primary" size="small" @click="handelsiger()">click</el-button>
         </el-col>
      </el-header>
      <el-container>
        <el-aside :width="flag?'56px':'15.8%'" style="overflow:none">
          <el-menu :default-active="this.$route.path" router :collapse="flag" :collapse-transition="false">
            <SidebarItem v-for="menu in menueList" :key="menu.path" :item="menu" :collapse="flag"/>
          </el-menu>
        </el-aside>
        <el-main>
          <BreadItem/>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SidebarItem from "./conponents/sidebarItem";
import BreadItem from "./conponents/breadcrumb";
export default {
  components: { BreadItem ,SidebarItem  },
  data() {
    return {
      icons:'el-icon-s-fold',
      flag:false,
      menueList: [
        {
          path: "/authority", //菜单项所对应的路由路径
          title: "权限管理", //菜单项名称
          children: [] //是否有子菜单，若没有，则为[]
        },
        {
          path: "/func3",
          title: "功能3",
          children: [
            {
              path: "/func31",
              title: "功能3-1",
              children: []
            },
            {
              path: "/func32",
              title: "功能3-2",
              children: []
            },
            {
              path: "/func33",
              title: "功能3-3",
              children: []
            }
          ]
        }
      ]
    };
  },
  methods: {
    loginOut() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    handelsiger() {
      console.log('click');
      
    },
    handelCal() {
      this.icons = 'el-icon-s-unfold'
      this.flag = !this.flag
    }
  }
};
</script>
<style lang="less" scoped>
.pages_content,
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
   background-color: #1F2D3D;
   .el-button--primary {
    color: #FFF;
    background-color: #1F2D3D;
    border-color: #1F2D3D;
    }
    .el-button--primary:focus, .el-button--primary:hover {
    background: #1F2D3D;
    border-color: #1F2D3D;
    color: #FFF;
    }
  // background-color: #F0F8FF;
  .iconFloat{
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .fl{
    display: flex;
    justify-content: flex-start;
    height: 100%;
  }
  .fr{
    display: flex;
    justify-content:flex-end;
  }
  .border_Right{
    border-right: 1px solid #ccc;
  }
}
.el-menu--collapse {
    width: 55px;
}
.el-aside {
  background-color: #EEF1F6;
  .el-menu{
    background-color:#EEF1F6;
    .el-menu-item:focus, .el-menu-item:hover {
      outline: 0;
      background-color: #E8ECF3;
    }
  }
}

</style>