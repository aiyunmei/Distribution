const mutations = { // 修改静态数据
  loading (state, boolean) { // 写入全局loading
    state.loading = boolean
  },
  table (state, array) { // 写入table展示数据
    state.table = array
  },
  tableData (state, array) { // 写入表格数据
    state.tableData = array
  },
  clearTableData (state) { // 清空表格数据
    state.tableData = []
  },
  tableRowData (state, json) { // 写入表格编辑行数据
    state.tableRowData = json
  },
  indexEdit (state, num) { // 写入表格编辑行index
    state.indexEdit = num
  },
  changeTableData (state, json) { // 修改编辑成功表格数据
    state.tableData[state.indexEdit][json.name] = json.value
  },
  tableTitle (state, obj) { // 写入表格标题
    state.tableTitle = obj
  },
  page (state, obj) { // 写入分页数据
    state.page = obj
  },
  clearPage (state) { // 清空分页数据
    state.page = {}
  }
}

export default mutations
