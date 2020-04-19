module.exports = setUpdate = (vals, ref, relAttr) => {

    const getIncludeUpdate = (key) => {
        let tempMatched = {}
        relAttr.rels.map(rel => {
            if (rel.attributes.includes(key)) {
                tempMatched.target = rel.target
                tempMatched.relType = rel.relType
            }
        })
        return tempMatched
    }


    const tempFunc = new Promise(function(resolve, reject){

        Object.keys(vals).map(async key => {
            const includeUpdate = await getIncludeUpdate(key)
            if (Object.keys(includeUpdate).length > 0) {
                const {target} = includeUpdate
                let tempVal = {}
                tempVal[key] = vals[key]
                target.update(tempVal, {where:ref})
            } else {
                let tempVal = {}
                tempVal[key] = vals[key]
                relAttr.source.update(tempVal, {where:ref})
            }
        })
        resolve('item Sucecssfully updated')
    })



    return tempFunc
}