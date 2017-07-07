const clearSearchData = { // 清空obj 数据
  install: (Vue) => {
    Vue.prototype.$clearJson = (obj) => {
      for (let item in obj) {
        obj[item] = ''
      }
    }
  }
}

export default clearSearchData
