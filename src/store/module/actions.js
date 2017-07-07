const actions = { // 异步执行修改静态数据
  setLoading ({ commit }, boolean) { // 修改loading
    commit('loading', boolean)
  },
  setTable ({ commit }, array) { // 写入表格展示数据
    commit('table', array)
  },
  setTableData ({ commit }, array) { // 写入表格数据
    commit('tableData', array)
  },
  setClearTableData ({ commit }) { // 清除表格数据
    commit('clearTableData')
  },
  setTableTitle ({ commit }, obj) { // 写入表格标题
    commit('tableTitle', obj)
  },
  setTableRowData ({ commit }, json) { // 写入编辑行数据
    commit('tableRowData', json)
  },
  setIndexEdit ({ commit }, num) { // 写入编辑行index
    commit('indexEdit', num)
  },
  setChangeTableData ({ commit }, json) { // 修改编辑成功某一行某一个字段数据
    commit('changeTableData', json)
  },
  setPage ({ commit }, obj) { // 写入分页数据
    commit('page', obj)
  },
  setClearPage ({ commit }) { // 清除分页数据
    commit('clearPage')
  }
}

export default actions
