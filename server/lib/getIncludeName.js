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


module.exports = function (source, target, primaryKey, includingAttr) {
  let includingKeys = []
  includingAttr.map(obj => {
    includingKeys = includingKeys.concat(obj.attributes)
  })
  return source.findAll({
    include : includingAttr
  }).then(async arr => {
    arr.map(obj => {
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
    })
    return {primaryKey : primaryKey, includingKeys : includingKeys, vals :arr}
  })
}
