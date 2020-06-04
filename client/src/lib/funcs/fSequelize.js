export const convertSeqDateTime = (str) => {
  const regexp = /([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})/
  const result = str.match(regexp)
  const obj = {}
  obj.yyyy = result[1]
  obj.yy = result[1].slice(0,2)
  obj.mm = result[2]
  obj.dd = result[3]
  obj.hh = result[4]
  obj.mn = result[5]
  obj.yymmdd = obj.yy + '.' + obj.mm + '.' + obj.dd
  obj.ddmmyy = obj.dd + '.' + obj.mm + '.' + obj.yy

  obj.hhmn = obj.hh + ':' + obj.mn
  
  return obj
}

export const monolizeObj = (originalObj) => {
  const getObjectKeys = (originalObj) => {
    const keys = Object.keys(originalObj)
    const objectKeysFunc = () => {
      let objectKeysTemp = []
      keys.map(key => {
        if (originalObj[key] !== null) {
          if (typeof originalObj[key] == 'object') {
            objectKeysTemp.push(key)
          }
        }
      })
      return objectKeysTemp
    }
  return objectKeysFunc()
  }
  let objectKeys = getObjectKeys(originalObj)
  let willConcatObjects = (originalObj[objectKeys[0]])
  delete originalObj[objectKeys[0]]
  const mergedObj = Object.assign({}, originalObj, willConcatObjects)
  return mergedObj
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

export const unSequelizify = (string) => {
  var res = string.replace(/(.*)(\.)(.*)/, '$3')
  return res
}

