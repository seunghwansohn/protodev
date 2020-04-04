module.exports = setNameToCode = (relAttr, findingKeys, addedObj) => {
  console.log('효효효', addedObj)
  let tempArr = []
  const {rels} = relAttr

  findingKeys.map(obj => {
    Object.keys(obj).map(asStr =>{
      rels.map(rel =>{
          if (rel.asStr == asStr) {
              console.log('케케케', asStr)
              console.log('쿄쿄쿄', obj[asStr])
              let reqName = ''
              Object.keys(obj[asStr]).map(key => {
                reqName = obj[asStr][key]
              })
              // console.log(reqName)
              let where = {}
              where[reqName] = addedObj[reqName]
              console.log('웨얼', where)
              rel.target.findOne({where:where}).then(result => {
                console.log('푸하하하', result)
              })
          }
      })
    })
  })

  // console.log(includingKeys)

  return tempArr
}
  