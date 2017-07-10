const baseUrl = ''
const loBaseUrl = 'http://192.168.230.130'

const api = {
  deviceCompany: { // 企业日常维护api
    result: baseUrl + ''
  },
  reportLine: { // 线路台账api
    // result: baseUrl + ''
    result: loBaseUrl + ':8080/report/qf/reportLine' // 本地地址
  },
  reportCompany: { // 运营公司台账api
    // result: baseUrl + ''
    result: loBaseUrl + ':8080/report/qf/reportCompany' // 本地地址
  },
  reportStation: { // 站点台账api
    // result: baseUrl + ''
    result: loBaseUrl + ':8080/report/qf/reportStation' // 本地地址
  },
  role: { // 角色管理
    result: 'static/role.json',
    add: baseUrl + '',
    update: baseUrl + '',
    delete: baseUrl + '',
    setRole: baseUrl + ''
  },
  user: { // 账号管理
    result: 'static/user.json',
    add: baseUrl + '',
    update: baseUrl + '',
    delete: baseUrl + ''
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
