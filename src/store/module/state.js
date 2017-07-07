const state = { // 静态数据
  loading: false, // 全局loading
  dateTimeScope: [], // 日期时间范围选择
  table: [], // 表格展示数据
  tableData: [], // 表格数据
  tableRowData: {}, // 表格编辑行数据
  indexEdit: 0, // 表格编辑行index
  tableTitle: {}, // 表格标题
  page: {}, // 分页数据
  cardStatusOptions: [ // 卡类型options
    { label: '使用中', value: 'enabled' }, { label: '已消卡', value: 'revoked' }, {label: '禁用中', value: 'disabled'}
  ]
}

export default state
