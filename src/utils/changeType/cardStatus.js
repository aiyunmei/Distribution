const cardType = {
  install: (Vue) => {
    Vue.prototype.$cardStatus = (data) => {
      let nData
      if (data === 'enabled') {
        nData = '使用中'
      } else if (data === 'revoked') {
        nData = '已消卡'
      } else if (data === 'disabled') {
        nData = '禁用中'
      } else {
        nData = null
      }
      return nData
    }
  }
}

export default cardType
