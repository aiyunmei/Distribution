const setDate = (time) => { // 日期格式转换成 yyyy-MM-dd
  if (time === null || time === '' || time === undefined) {
    let nData = ''
    return nData
  }
  var seperator1 = '-'
  // var seperator2 = ':'
  let month = time.getMonth() + 1
  let strDate = time.getDate()
  // let hours = time.getHours()
  // var min = time.getMinutes()
  // var s = time.getSeconds()
  if (month < 10) {
    month = '0' + month
  }
  if (strDate < 10) {
    strDate = '0' + strDate
  }
  var currentdate = time.getFullYear() + seperator1 + month + seperator1 + strDate // + ' ' + hours + seperator2 + min + seperator2 + s
  return currentdate
}

export default setDate
