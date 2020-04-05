module.exports = setNameToCode = (relAttr, findingKeys, addedObj) => {
  
  console.log('애디드오브젝', addedObj)
  const {rels} = relAttr
  let tempArr = []

  let where = {}
  let relIdx = null

  let targetCode = null
  let reqName = null

  let valid = false

  

  findingKeys.map(obj => {
    Object.keys(obj).map(asStr =>{
      rels.map((rel, idx) =>{
        if (rel.asStr == asStr) {
          
          relIdx = idx

          Object.keys(obj[asStr]).map(key => {
            targetCode = key
            reqName = obj[asStr][key]
          })
          where[reqName] = addedObj[reqName]

          if (addedObj[reqName] !== null) {
            valid = true
          }
        }
      })
    })
  })


  if (valie == true) {

  }
  console.log('렐레', where, relIdx, targetCode, reqName)
  return rels[relIdx].target.findOne({where:where, attributes :[targetCode]}, ).then(result => {
    let tempObj = Object.assign(addedObj, result.dataValues)
    delete tempObj[reqName]
    return tempObj

  })
}
  