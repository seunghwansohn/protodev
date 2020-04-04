module.exports = getIncludingArr = (relAttr, includingKeys) => {
  let tempArr = []
  let {rels}  = relAttr

  Object.keys(includingKeys).map(key => {
    rels.map(rel => {
      if (rel.asStr == key) {
        tempArr.push(
          {model: rel.target, as: rel.asStr}
        )
      }
    })  
  })

  return tempArr
}
