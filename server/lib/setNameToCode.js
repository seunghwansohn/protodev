module.exports = setNameToCode = (relAttr, findingKeys, addedObj) => {
  
  const {rels} = relAttr
  let tempArr = []

  let where = {}
  let relIdx = ''

  let targetCode = ''

  findingKeys.map(obj => {
    Object.keys(obj).map(asStr =>{
      rels.map((rel, idx) =>{
        if (rel.asStr == asStr) {
          
          relIdx = idx

          let reqName = ''

          Object.keys(obj[asStr]).map(key => {
            targetCode = key
            reqName = obj[asStr][key]
          })
          where[reqName] = addedObj[reqName]

        }
      })
    })
  })

  return rels[relIdx].target.findOne({where:where, attributes :[targetCode]}, ).then(result => {
    return result.dataValues
  })
}
  