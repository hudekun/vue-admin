<template>
    <el-form
        :model="registerRuleForm"
        :rules="listRoules"
        ref="registRef"
        label-width="20px"
        class="formBotm"
      >
        <el-form-item prop="username">
          <el-input v-model="registerRuleForm.username" prefix-icon="el-icon-user-solid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="registerRuleForm.password" prefix-icon="el-icon-s-release" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="emilNum">
          <el-input  v-model="registerRuleForm.emilNum"  prefix-icon="el-icon-s-release"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" style="width:100%" @click="handelRegister()">注册</el-button>
        </el-form-item>
      </el-form>
</template>
<script>
import {regist} from '../../api/user'
export default {
    props: {
        flag: {
        type: Boolean,
        default: true
        }
    },
    data(){
        return {
            listRoules: {
                username: [
                { required: true, message: "请输入用户名", trigger: "blur" },
                { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
                ],
                password: [
                { required: true, message: "请输入用户名密码", trigger: "blur" },
                { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
                ],
                emilNum:[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            
            },
            registerRuleForm:{
                username: "",
                password: "",
                emilNum:""
            }
        }
         
    },
    methods:{
        handelRegister() {
            console.log(this.flag);
              if(!this.flag){
                this.$refs.registRef.validate(valid => {
                        if (!valid) {
                          return this.$message.error("输入错误");
                        }
                      const {username,password,emilNum} = this.registerRuleForm
                      
                      console.log({username,password,emilNum});
                    
                        regist({username,password,emilNum}).then(res => {
                          if(res.status === '200') {
                            this.$message.success(res.msg);
                            this.$emit('childFn', true);
                          }else if(res.status === '201') {
                            this.$message.error(res.msg);
                          }
                        });
                      });
              }
        }
    }
}
</script>
<style lang="less" scoped>
.formBotm {
    position: absolute;
    bottom: 10px;
    padding: 0 15px;
    box-sizing: border-box;
    width: 100%;
  }
</style>