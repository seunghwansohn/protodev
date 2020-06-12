//source 모델, target모델, 그리고 조회코드(targetCode)만 넣으면 code에 해당하는 name을 solidify하여 반환

//사용 예 :

// exports.test = (req,res) => {
//     let primaryKey = 'itemCode'
//     let includingAttr = [
//       {model:Supplier, plain : true, raw: false, nest : false, as : 'supplier', attributes : ['supplierName']},
//       {model:ItemPrice, plain : true, raw: false, nest : false, as: 'price', attributes : ['VNPrice', 'stkVVar', 'buyingPKR', 'stkCVar']}
//     ]
//     getIncludeName(Item, Supplier, primaryKey, includingAttr).then(items => {
//       res.status(500).send(items)
//     })
// }


module.exports = function (relAttr, where) {

  const {source, primaryKey} = relAttr
  const includingAttr     = getIncludingAttr(relAttr)
  const findingAttr       = getFindingAttr(relAttr)
  const filesAttr         = getFilesAttr(relAttr)
  const includingManyAttr = getIncludingManyAttr(relAttr)

  let includingKeys = {}
  let findingKeys = []
  let filesKeys = []

  let afterIncluding = ''

  includingAttr.map(obj => {
    includingKeys[obj.as] = (obj.attributes)
  })

  if (filesAttr) {
    filesAttr.map(obj => {
      let tempObj = {}
      tempObj[obj.as] = {}
      tempObj[obj.as][obj.primaryCode] = obj.attributes[0]
      filesKeys.push(tempObj)
    })
  }
  
  findingAttr.map(obj => {
    let tempObj = {}
    tempObj[obj.as] = {}
    tempObj[obj.as][obj.primaryCode] = obj.attributes[0]
    findingKeys.push(tempObj)
  })


  let concatedAttr = includingAttr.concat(findingAttr)

  if (filesAttr) {
    concatedAttr      = concatedAttr.concat(filesAttr)
  }
  return source.findOne({
    where : where,
    include : concatedAttr
  }).then(async obj => {
    includingAttr.map(attr => {
      let targetCodes = attr.attributes
      let as = attr.as
      targetCodes.map(async targetCode => {
        if (obj.dataValues[as] !== null && obj.dataValues[as] !== undefined) {
          obj.dataValues[targetCode] = await obj.dataValues[as].dataValues[targetCode]
          await delete obj.dataValues[as]
        }    
      })
    })
    findingAttr.map(async attr => {
      let targetCodes = await attr.attributes
      let as = await attr.as
      let primaryCode = await attr.primaryCode
      await targetCodes.map(async targetCode => {
        if (obj.dataValues[as] !== null && obj.dataValues[as] !== undefined) {
          obj.dataValues[targetCode] = await obj.dataValues[as].dataValues[targetCode]
          await delete obj.dataValues[as]
          await delete obj.dataValues[primaryCode]
        }    
      })
    })
    afterIncluding = await {primaryKey : primaryKey, includingKeys : includingKeys, findingKeys : findingKeys, filesKeys : filesKeys, vals :obj}
    return afterIncluding
  })
}


