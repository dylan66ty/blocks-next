const toCamelCase = (string) => {
  return string
    .replace(/^./, (match) => match.toLowerCase())
    .replace(/-(\w)/g, (_, p1) => {
      return p1?.toUpperCase() ?? ''
    })
}

const toUpperFirstChar = (string = '') => {
  return string[0].toUpperCase() + string.slice(1)
}

module.exports = {
  toCamelCase,
  toUpperFirstChar
}
