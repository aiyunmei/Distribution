<template>
  <div class="wrapper" :class="{ 'isMenu-active' : toggle === true }">

    <vHeader></vHeader>

    <div class="menu-toggle" @click="menuToggle(toggle)">
      <i class="el-icon-d-arrow-right"></i>
    </div>

    <vSidebar></vSidebar>

    <div class="content" v-loading.body="loading">
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import vHeader from './header.vue'
  import vSidebar from './sidebar.vue'
  import { mapState } from 'vuex'
  import setTableTtile from './js/setTableTitle'
  export default {
    components: { vHeader, vSidebar },
    data () {
      return {
        toggle: false
      }
    },
    computed: mapState({
      loading: state => state.loading
    }),
    mounted () {
      this.onReady()
      this.routerChange()
    },
    methods: {
      menuToggle (status) { // 目录切换
        status === false ? this.toggle = true : this.toggle = false
      },
      onReady () { // 载入页面
        let that = this
        let arr = JSON.parse(localStorage.getItem('routerData'))
        let path = that.$route.path
        if (path !== '/readme') {
          that.$store.dispatch('setTableTitle', setTableTtile(path.replace('/', ''), arr))
          that.$store.dispatch('setTable', that.$table[path.replace('/', '')])
        }
      },
      routerChange () { // 路由切换
        let that = this
        let arr = JSON.parse(localStorage.getItem('routerData'))
        that.$router.beforeEach((to, from, next) => {
          if (to.path !== '/readme') {
            that.$store.dispatch('setTableTitle', setTableTtile(to.path.replace('/', ''), arr))
            that.$store.dispatch('setTable', that.$table[to.path.replace('/', '')])
          }
          next()
        })
      }
    }
  }
</script>
