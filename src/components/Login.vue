<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avater_box">
        <img src="..\assets\logo.png" alt />
      </div>
      <!-- 表单区域 -->
      <el-form
        ref="loginFormRef"
        label-width="0"
        :model="loginForm"
        :rules="rules"
        class="login_form"
      >
        <el-form-item label prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      rules: {
        username: [
          { requires: true, message: '请输入登录用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在3-5个字符', trigger: 'blur' },
        ],
        password: [
          { requires: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 6, message: '密码只能6位', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    //点击充值按钮，充值登录表单
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(
        axios
          .post('login', this.loginForm)
          .then((response) => {
            const data = response.data
            console.log(data)

            if (data.meta.status !== 200)
              return this.$message.error('登录失败！')
            this.$message.success('登陆成功')

            //1、 将登录成功之后的token，保存到客户端的sessionStorage中
            //1.2 将项目中除了登录之外的其他API接口，必须在登录之后才能访问
            //1.2 token 直营在当前网站打开期间生效，所以将token 保存在 sessionStorage中
            window.sessionStorage.setItem('token', data.data.token)
            //2、 通过编程式导航跳转到后台主页，路由地址是 /home
            this.$router.push('/home')
          })
          .catch(function (error) {
            console.log(error)
          })
      )
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avater_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
