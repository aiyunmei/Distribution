const setRouter = (data) => { // 根据json数据动态渲染路由
  let nData = []
  let home = {
    path: '/readme',
    component: resolve => require(['../../common/home.vue'], resolve),
    children: [
      {
        path: '/',
        component: resolve => require(['../../page/readme/readme.vue'], resolve)
      }
    ]
  }
  for (let i = 0; i < data.length; i++) {
    let moduleItems = data[i].moduleItems
    for (let j = 0; j < moduleItems.length; j++) {
      let obj = {}
      let path = moduleItems[j].modulePath
      obj.path = '/' + path
      obj.component = resolve => require([`../../page/${path}/${path}.vue`], resolve)
      home.children.push(obj)
    }
  }
  nData.push(home)
  return nData
}

export default setRouter
