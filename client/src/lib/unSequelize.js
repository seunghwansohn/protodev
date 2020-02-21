export const unSequelizify = (string) => {
    var res = string.replace(/(.*)(\.)(.*)/, '$3')
    return res
  }
  
export const unSequelizeKeys = (obj) => {
    const arrayKeys = Object.keys(obj)
    arrayKeys.map(key => {
        if (key.match(/(.*)(\.)(.*)/)) {
            obj[unSequelizify(key)] = obj[key]
            delete obj[key]
        }
    })
return obj
}
