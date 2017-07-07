const firstUpperCase = (str) => { // 首字母变成大写
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

export default firstUpperCase
