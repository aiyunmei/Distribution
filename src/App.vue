<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app',
    mounted () {
      this.setRouter()
    },
    methods: {
      setRouter () {
        let loginName = localStorage.getItem('ms_username')
        if (loginName) {
          let routerData = JSON.parse(localStorage.getItem('routerData'))
          let nData = []
          let home = {
            path: '/readme',
            component: resolve => require(['./components/common/home.vue'], resolve),
            children: [
              {
                path: '/',
                component: resolve => require(['./components/page/readme/readme.vue'], resolve)
              }
            ]
          }
          for (let i = 0; i < routerData.length; i++) {
            let moduleItems = routerData[i].moduleItems
            for (let j = 0; j < moduleItems.length; j++) {
              let obj = {}
              let path = moduleItems[j].modulePath
              obj.path = '/' + path
              obj.component = resolve => require([`./components/page/${path}/${path}.vue`], resolve)
              home.children.push(obj)
            }
          }
          nData.push(home)
          this.$router.addRoutes(nData)
        } else {
          localStorage.removeItem('ms_username')
          localStorage.removeItem('routerData')
          localStorage.removeItem('companyId')
          localStorage.removeItem('accountId')
          this.$router.push('/login')
        }
      }
    }
  }
</script>
