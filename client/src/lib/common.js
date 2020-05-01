export var generateRandom = function (min, max) {
    
    var ranNum = min && max ? 
        Math.floor(Math.random()*(max-min+1)) + min
        : 
        Math.floor(Math.random()*(999999-100001+1)) + 100001
    return ranNum;
}

export const getIncludingKeys = (arr) => {
    let tempArr = []
    if (arr && arr.length > 0) {
        tempArr = arr[0].includingKeys
    }
    return tempArr
}

export const withoutKeys = (arr) => {
    let tempArr = []
    arr.map(obj => {
        delete obj.includingKeys
        delete obj.files

        tempArr.push(obj)
    })
    return tempArr
}



export const getIncludingKeys1 = (arr) => {
    let tempArr = []
    arr.map(obj => {
        delete obj.includingKeys
        tempArr.push(obj)
    })
    return tempArr
}

export const getOnlyFiles = (arr) => {
    console.log(arr)
    let tempArr = []
    arr.map(obj => {
        console.log(typeof obj.files)
        tempArr.push(obj.files)
    })
    console.log(tempArr)
    return tempArr
}

// export const withoutKeys1 = (arr) => {
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
