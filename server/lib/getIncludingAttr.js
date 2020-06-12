module.exports = getIncludingAttr = (relAttr) => {
    let tempArr = []
    let tempObj = {}
    console.log('렐에티티얄', relAttr)
    relAttr.rels.map(rel => {
      if (rel.relType == 'including') {
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