//아래와 같은 예시의 객체를 클라이언트에서 받아 addedNew와 includingKeys를 각각 넣으면
// {
//     "addedNew": {
//       "id": null,
//       "itemCode": "fedg",
//       "itemName": "rherh",
//       "description": null,
//       "supplierName" : "이미자",
//       "stkVVar" : "1.12",
//       "stkCVar" : "1.03"
//     },
//     "primaryKey": "itemCode",
//     "includingKeys": {
//       "supplier": [ "supplierName" ],
//       "price": [ "VNPrice", "stkVVar", "buyingPKR", "stkCVar" ]
//     }
// }

//아래와 같은 객체로 변환하여 반환해주는 함수
// {
//     "id": null,
//     "itemCode": "fedg",
//     "itemName": "rherh",
//     "description": null,
//     "supplier": {
//         "supplierName": "이미자"
//     },
//     "price": {
//         "stkVVar": "1.12",
//         "stkCVar": "1.03"
//     }
// }
//***** premise객체로 반환됨에 유의 */

module.exports = getCreateObj = async (addedNew, primaryKey, primaryCode, includingKeys, findingKeys) => {

    const as = Object.keys(includingKeys)

    await as.map(asStr => {
      includingKeys[asStr].map(async key => {
        addedNew[asStr] = addedNew[asStr] ? addedNew[asStr] : {}
        addedNew[asStr][key] = await addedNew[key]
        addedNew[asStr][primaryKey] = primaryCode
        await delete addedNew[key]
      })
    })
    await console.log('리절트에디드뉴는 ', addedNew)
    return await addedNew
}
