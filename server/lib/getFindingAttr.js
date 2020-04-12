module.exports = getFindingAttr = (relAttr) => {
    let tempArr = []
    relAttr.rels.map(rel => {
      if (rel.relType == 'finding') {
        let tempObj = {}
        tempObj.model = rel.target
        tempObj.plain = true
        tempObj.raw = false
        tempObj.nest = false
        tempObj.as = rel.asStr
        tempObj.attributes = rel.attributes
        tempObj.primaryCode = rel.primaryCode

        tempArr.push(tempObj)
      }
    })
    return tempArr
}