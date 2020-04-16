module.exports = function (source, primaryKey, findingAttr, includingAttr) {
    let includingKeys = {}
    let findingKeys = []
    let afterIncluding = ''
  
    includingAttr.map(obj => {
      includingKeys[obj.as] = (obj.attributes)
    })
  
    // findingAttr.map(obj => {
    //   let tempObj = {}
    //   tempObj[obj.as] = {}
    //   tempObj[obj.as][obj.primaryCode] = obj.attributes[0]
    //   findingKeys.push(tempObj)
    // })
    return includingAttr
}