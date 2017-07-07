// 表格展示数据 json  sortable是否需要开启排序 开启排序的字段必须为数字或者时间

const role = [ // 角色管理
  { label: '角色名称', name: 'roleName' },
  { label: '备注', name: 'description' },
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
  role, card, userInfo
}
