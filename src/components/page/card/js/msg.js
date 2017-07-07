const message = (res, store, row, cardStatus, msg) => {
  if (res.message.code === '20000') {
    store.dispatch('setChangeTableData', {name: 'cardStatus', value: row.cardStatus})
    store.dispatch('setChangeTableData', {name: 'cardStatusName', value: cardStatus(row.cardStatus)})
    msg({type: 'success', message: '编辑成功'})
  } else if (res.message.code === '40002') {
    msg({type: 'error', message: res.message.msg})
  } else if (res.message.code === '40005') {
    msg({type: 'error', message: res.message.msg})
  } else { // 失败
    msg({type: 'error', message: '编辑失败'})
  }
}

export default message
