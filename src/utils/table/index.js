// 表格展示数据 json  sortable是否需要开启排序 开启排序的字段必须为数字或者时间
const card = [
  { label: '卡编号', name: 'cardNo' },
  { label: 'userId', name: 'userId' },
  { label: '姓名', name: 'userName' },
  { label: '电话', name: 'mobilePhone' },
  { label: '状态', name: 'cardStatusName' },
  { label: '退卡截止时间', name: 'checkEndTime', sortable: true },
  { label: '领卡时间', name: 'createTime', sortable: true }
]

export default {
  card
}
