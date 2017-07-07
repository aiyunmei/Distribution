const setRoleInfo = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].checked = false
    data[i].disabled = false
    data[i].checkVal = []
  }
  return data
}

export default setRoleInfo
