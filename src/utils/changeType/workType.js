const workType = { // 判断启用禁用
  install: (Vue) => {
    Vue.prototype.$workType = (data) => {
      let nData
      if (data === 0 || data === '0') {
        nData = '禁用'
      } else if (data === 1 || data === '1') {
        nData = '启用'
      } else {
        nData = null
      }
      return nData
    }
  }
}

export default workType
