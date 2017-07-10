const getRoleName = (id, data) => { // 根据角色Id 获取 角色名称
  let name
  for (let i = 0; i < data.length; i++) {
    if (parseInt(id) === parseInt(data[i].roleId)) {
      name = data[i].roleName
      break
    }
  }
  return name
}

export default getRoleName
