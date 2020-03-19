export var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
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
