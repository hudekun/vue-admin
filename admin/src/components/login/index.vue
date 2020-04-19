<template>
  <div class="login_container">
    <vue-particles
        color="#409EFF"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#409EFF"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >   </vue-particles>
    <div class="login_box" :style="flagE? '':'height:360px'">
      <h2>博客系统</h2>
      <el-form
        v-if="flagE"
        :model="loginRuleForm"
        :rules="loginRules"
        ref="loginRef"
        label-width="20px"
        class="formBotm"
      >
        <el-form-item prop="username">
          <el-input v-model="loginRuleForm.username" prefix-icon="el-icon-user-solid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input type="password" v-model="loginRuleForm.password" prefix-icon="el-icon-s-release" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginIn()" style="width:100%">登陆</el-button>
          <!-- <el-button type="info" @click="register()">注册</el-button> -->
        </el-form-item>
        <div class="toregist"> 
          <el-link type="danger" @click="goRegist()">去注册</el-link>
        </div>
      </el-form>
      
      <Register :flag="flagE" @childFn="parentFn" v-else/>
      
    </div>
  </div>
</template>

<script>

import Register from '../register/index'

 import {mapState} from 'vuex'
export default {
  data() {
    return {
      //用户名验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户名密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      },
      //用户名信息
      loginRuleForm: {
        username: "",
        password: ""
      },
      flagE:true
    }
  },
    computed: {
        ...mapState({
            loading: state=>state.loading,
            msg: state=>state.user.msg
        })
    },
  components:{
    Register
  },
  methods: {
    loginIn() {
      this.$refs.loginRef.validate(valid => {
        if (!valid) return this.$message.error("用户名密码错误");
         this.$store.dispatch('user/loginOn', this.loginRuleForm).then(res=>{
           //const token = window.sessionStorage.getItem("token");
           if (res.code == 1) {
            this.$router.push("/layout");
             this.$message.success(res.msg);
          }
        })
      });
    },
    parentFn(val){
      console.log(val);
      
      this.flagE = val
    },
    goRegist(){
      this.flagE = false
    }
  }
};
</script>

<style lang="less" scoped>
 #particles-js {
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;
    overflow: hidden;
  }
.login_container {
  background-color: #fff;
  height: 100%;
}
.login_box {
  width: 400px;
  height: 320px;
  border: 1px solid #eee;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  h2{
    text-align: center;
    font-size: 34px;
    margin: 0;
    padding: 35px 10px;
     background: linear-gradient(to right, red, blue);
        -webkit-background-clip: text;
        color: transparent;
  }
  .formBotm {
    position: absolute;
    bottom: 10px;
    padding: 0 15px;
    box-sizing: border-box;
    width: 100%;
  }
  .resetTo {
    display: flex;
    justify-content: flex-end;
  }
}
</style>