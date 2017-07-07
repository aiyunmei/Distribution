const baseUrl = ''

const api = {
  deviceCompany: { // 企业日常维护api
    result: baseUrl + ''
  },
  role: { // 角色管理
    result: 'static/role.json',
    add: baseUrl + '',
    update: baseUrl + '',
    delete: baseUrl + '',
    setRole: baseUrl + ''
  },
  card: { // 开卡/消卡 api
    result: 'http://118.178.88.252:8080/portal/card/list', // 查询
    enabled: 'https://zf.wuhanbus.com:8443/api/virtual/card/alipay/status?action=ISSUE', // 开卡
    revoked: 'https://zf.wuhanbus.com:8443/api/virtual/card/local/revoked?action=revoke&disabledTips=系统统一退卡' // 消卡
  },
  userInfo: { // 用户信息查询
    result: 'http://118.178.88.252:8080/portal/user/list' // 查询
  }
}

export default api
