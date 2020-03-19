const rmTimeFromReq = require("./sequelMiddleWares");


//하위객체를 또 가지고 있는 객체의 경우
//하위 객체 값을 모두 단층화 시키는 메소드임.
module.exports = function(originalObjArr, includingKey) {
    let resultArr = []
    const getObjectKeys = (originalObjArr) => {
      originalObjArr.map(obj => {
        let willConcatObjects = obj[includingKey].dataValues
        let includingKeys = Object.keys(rmTimeFromReq(obj[includingKey].dataValues))
        delete obj.dataValues[includingKey]
        const mergedObj = Object.assign({}, obj.dataValues, willConcatObjects)
        mergedObj.includingKeys = includingKeys
        resultArr.push(mergedObj)
      })  
    }
    getObjectKeys(originalObjArr)
    return resultArr
}
