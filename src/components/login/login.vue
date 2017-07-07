<template>
  <div class="login-wrap">
    <div class="ms-title">清分平台</div>
    <div class="ms-login" v-loading.body="loading">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import setRouter from './js/setRouter'
  export default {
    data () {
      return {
        loading: false,
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', toggle: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', toggle: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.Result()
    },
    methods: {
      Result () {
        let loginName = localStorage.getItem('ms_username')
        if (loginName) {
          this.$router.push('/readme')
        }
      },
      submitForm (formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.loading = true
            let params = {
              loginName: that.ruleForm.username, password: that.ruleForm.password
            }
            that.$axios.get('static/login.json', params).then((res) => {
              console.log(res)
              if (res.data.msg.code === '20000') {
                let routerData = res.data.data.modules
                let companyId = res.data.data.companyId
                let accountId = res.data.data.Id
                localStorage.setItem('ms_username', that.ruleForm.username) // 存储 用户信息
                localStorage.setItem('routerData', JSON.stringify(routerData)) // 存储 路由
                localStorage.setItem('companyId', companyId)  // 存储 companyId
                localStorage.setItem('accountId', accountId) // 存储 账号id
                that.$router.addRoutes(setRouter(routerData)) // 渲染后台传送过来的路由
                that.$router.push('/readme')
                localStorage.setItem('ms_username', that.ruleForm.username)
                that.$router.push('/readme')
              } else {
                that.$message({type: 'error', message: res.data.msg.message})
              }
              that.loading = false
            }).catch((err) => {
              if (err) throw err
              that.$message({type: 'error', message: '网络异常'})
              that.loading = false
            })
          } else {
            console.log('error')
          }
        })
      }
    }
  }
</script>
