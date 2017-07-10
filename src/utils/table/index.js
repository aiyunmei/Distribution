// 表格展示数据 json  sortable是否需要开启排序 开启排序的字段必须为数字或者时间

const reportLine = [ // 线路台账
  { label: '线路/站点编号', name: 'lineShort' },
  { label: '交易金额(元)', name: 'amount' },
  { label: '交易笔数', name: 'punchCount' },
  { label: '结算时间', name: 'checkDate', sortable: true }
]

const reportCompany = [ // 运营公司台账
  { label: '公司名称', name: 'comName' },
  { label: '交易金额(元)', name: 'amount' },
  { label: '交易笔数', name: 'punchCount' },
  { label: '结算时间', name: 'checkDate', sortable: true }
]

const reportStation = [ // 站点台账api
  { label: '站点编号', name: 'lineName' },
  { label: '站点名', name: 'carryName' },
  { label: '刷卡次数', name: 'punchCount' },
  { label: '刷卡金额(元)', name: 'amount' },
  { label: '结算日期', name: 'checkDate' }
]

const role = [ // 角色管理
  { label: '角色名称', name: 'roleName' },
  { label: '备注', name: 'description' },
  { label: '创建时间', name: 'createTime', sortable: true }
]

const user = [ // 账号管理
  { label: '账号', name: 'loginName' },
  { label: '密码', name: 'passwordName' },
  { label: '角色', name: 'roleName' },
  { label: '状态', name: 'statusName' },
  { label: '创建时间', name: 'createTime', sortable: true }
]

const card = [ // 开卡/退卡
  { label: '卡编号', name: 'cardNo' },
  { label: 'userId', name: 'userId' },
  { label: '姓名', name: 'userName' },
  { label: '电话', name: 'mobilePhone' },
  { label: '状态', name: 'cardStatusName' },
  { label: '退卡截止时间', name: 'checkEndTime', sortable: true },
  { label: '领卡时间', name: 'createTime', sortable: true }
]

const userInfo = [ // 用户信息查询
  { label: 'userId', name: 'userId' },
  { label: '姓名', name: 'userName' },
  { label: '电话', name: 'mobilePhone' },
  { label: '城市', name: 'city' },
  { label: '省份', name: 'province' },
  { label: '身份证', name: 'certNo' },
  { label: '创建时间', name: 'createTime', sortable: true }
]

export default {
  reportLine, reportCompany, reportStation, role, card, userInfo, user
}
