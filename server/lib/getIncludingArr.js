module.exports = getIncludingArr = (relAttr, includingKeys) => {
    let tempArr = []
    relAttr.rels.map(rel => {
      tempArr.push(
        {model: rel.target, as: rel.asStr, plain : true, raw: false, nest : false, attributes : includingKeys[rel.asStr]}
      )
    })
    return tempArr
}
