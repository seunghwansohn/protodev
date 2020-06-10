module.exports = getIncludingManyAttr = (relAttr) => {
    let tempArr = []
    let tempObj = {}
    relAttr.rels.map(rel => {
      if (rel.relType == 'includingMany') {
        tempObj.model = rel.target
        tempObj.plain = true
        tempObj.raw = false
        tempObj.nest = false
        tempObj.as = rel.asStr
        tempObj.attributes = rel.attributes
        tempArr.push(tempObj)
      }
    })
    return tempArr
}