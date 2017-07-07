const setTableTitle = (path, arr) => {
  let obj = {}
  let parenId
  for (let i = 0; i < arr.length; i++) {
    let moduleItems = arr[i].moduleItems
    for (let j = 0; j < moduleItems.length; j++) {
      if (path === moduleItems[j].modulePath) {
        obj.small = moduleItems[j].moduleName
        parenId = moduleItems[j].parentId
        break
      }
    }
  }
  for (let z = 0; z < arr.length; z++) {
    if (parseInt(parenId) === parseInt(arr[z].id)) {
      obj.big = arr[z].moduleName
      break
    }
  }
  return obj
}

export default setTableTitle
