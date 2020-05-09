//findingKeys에서 값을 받아서 code를 Name으로 대치하는 코드

module.exports = setNameToCode = (relAttr, findingKeys, addedObj) => {

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
          targetCode = obj[asStr]
        }
      })
    })
  })

  return rels[relIdx].target.findOne({where:where, attributes :[targetCode]}, ).then(result => {
    let tempObj = Object.assign(addedObj, result.dataValues)
    delete tempObj[reqName]
    return tempObj

  })
}
  