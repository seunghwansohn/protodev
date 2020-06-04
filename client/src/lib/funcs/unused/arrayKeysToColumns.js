function unCamelCase (str){
    return str
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        // uppercase the first character
        .replace(/^./, function(str){ return str.toUpperCase(); })
}

export const ArrayKeysToColumns = (Array) => {
    let keysFunc = () => {
        if (Array !== null) {
            return Object.keys(Array[0])
        }
    }
    const keys = keysFunc()
    const columnIds = []
    const columns = []
    if (keys !== undefined) {
        keys.map(key => {
            if (key !== "createdAt" && key !== "updatedAt" )
            columnIds.push(key)
        })
    }
    columnIds.map(columnId => {
        const obj = { id : columnId, label: unCamelCase(columnId)}
        columns.push(obj)
    })
    return columns;
}

export const objArrKeysToArr = (Array) => {
    let keysFunc = () => {
        if (Array !== null) {
            return Object.keys(Array[0])
        }
    }
    const keys = keysFunc()
    const columnIds = []
    if (keys !== undefined) {
        keys.map(key => {
            if (key !== "createdAt" && key !== "updatedAt" )
            columnIds.push(key)
        })
    }
    return columnIds;
}

export const onArrangeCols = (Arr, arrangeRules) => {
    let firstIndex = ''
    let secondIndex = ''
    arrangeRules.map(rule => {
        if (Arr.indexOf(rule[0]) !== -1) {
            firstIndex = Arr.indexOf(rule[0])
            if (Arr.indexOf(rule[1]) !== -1) {
              secondIndex = Arr.indexOf(rule[1])
            }
            if (firstIndex !== '' && secondIndex !== '') {
                if (firstIndex < secondIndex) {
                    Arr.splice(firstIndex, 1)
                    Arr.splice(secondIndex, 0, rule[0])
                }
                else {
                    Arr.splice(firstIndex, 1)
                    Arr.splice(secondIndex + 1, 0, rule[0])
                }

            }
        }
    })
    return Arr
}