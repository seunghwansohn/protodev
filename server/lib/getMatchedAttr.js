module.exports = function (key, relAttr) {
    let matchedAttr = {}
    relAttr.rels.map(rel =>{
        rel.attributes.map(attribute => {
            if (key == attribute) {
                matchedAttr.relType = rel.relType
                matchedAttr.asStr = rel.asStr
            }
        })
    })
    return matchedAttr
}