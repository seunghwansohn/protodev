export var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random()*(999999-100001+1)) + 100001;
    return ranNum;
}

export const getIncludingKeys = (arr) => {
    let tempArr = []
    if (arr && arr.length > 0) {
        tempArr = arr[0].includingKeys
    }
    return tempArr
}

export const withoutIncludingKeys = (arr) => {
    let tempArr = []
    arr.map(obj => {
        delete obj.includingKeys
        tempArr.push(obj)
    })
    return tempArr
}



export const getIncludingKeys1 = (arr) => {
    let tempArr = []
    arr.map(obj => {
        console.log(obj)
        delete obj.includingKeys
        tempArr.push(obj)
    })
    return tempArr
}

// export const withoutIncludingKeys1 = (arr) => {
//     let tempArr = []
//     arr.map(obj => {
//         Object.keys(obj).map(key => 
//             {
//                 if (string.include(key)) {

//                 }
//             }
//         )
//         delete obj.includingKeys
//         tempArr.push(obj)
//     })
//     return tempArr
// }
