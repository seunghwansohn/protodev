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


module.exports = function (relAttr) {
  const {
    source, 
    primaryKey, 
  } = relAttr

  const includingAttr     = getIncludingAttr(relAttr)
  const findingAttr       = getFindingAttr(relAttr)
  const filesAttr         = getFilesAttr(relAttr)
  const includingManyAttr = getIncludingManyAttr(relAttr)


  let includingManyKeys = {}
  let includingKeys = {}
  let findingKeys = []
  let filesKeys = []

  let afterIncluding = ''

  includingAttr.map(obj => {
    includingKeys[obj.as] = (obj.attributes)
  })

  includingManyAttr.map(obj => {
    includingManyKeys[obj.as] = (obj.attributes)
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

  let concatedAttr  = includingAttr.concat(findingAttr)
  concatedAttr  = concatedAttr.concat(findingAttr)

  
  if (filesAttr) {
    concatedAttr      = concatedAttr.concat(includingManyAttr)
  }

  console.log('콘케티드는', concatedAttr)
  return source.findAll({
    include : concatedAttr
  }).then(async arr => {
    arr.map(obj => {
    console.log('오브젝은 ', obj)

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

      includingManyAttr.map(async attr => {
        let targetCodes = await attr.attributes
        let as = await attr.as
        console.log('애즈는', as)
        targetCodes.map(async targetCode => {
          console.log('타겟코드는', targetCode)
          if (obj.dataValues[as] !== null && obj.dataValues[as] !== undefined) {
            await console.log('둥로이')
            obj.dataValues[targetCode] = '개딩신'
            // await obj.dataValues[as].dataValues[targetCode]

            // await delete obj.dataValues[as]
            await console.log('바뀐오브젝은 ', obj)
          }    
        })
        console.log('에얄얄은', arr)
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
    })
    afterIncluding = await {
      primaryKey : primaryKey, 
      includingKeys     : includingKeys, 
      includingManyKeys : includingManyKeys, 
      findingKeys       : findingKeys, 
      filesKeys         : filesKeys,
       
      vals :arr
    }
    return afterIncluding
  })
}
