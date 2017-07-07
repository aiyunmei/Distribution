<template>
  <div class="header">
    <div class="header-info">
      <div class="logo">清分平台</div>
      <div class="user-info">
        <el-dropdown trigger="hover" @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎，{{ username }}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      username () {
        let username = localStorage.getItem('ms_username')
        if (username) {
          return username
        }
      }
    },
    methods: {
      handleCommand (command) {
        if (command === 'loginout') {
          localStorage.removeItem('ms_username')
          localStorage.removeItem('routerData')
          localStorage.removeItem('appKey')
          localStorage.removeItem('accountId')
          this.$router.push('/login')
        }
      }
    }
  }
</script>
