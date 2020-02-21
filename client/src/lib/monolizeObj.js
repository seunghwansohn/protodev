//하위객체를 또 가지고 있는 객체의 경우
//하위 객체 값을 모두 단층화 시키는 메소드임.
const monolizeObj = (originalObj) => {
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

export default monolizeObj