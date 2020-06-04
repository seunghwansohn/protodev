export const hasWhiteSpace = (s) => {
    return s.indexOf(' ') >= 0;
}
  
export const maxValue = (value, min) => {
    return value && value > Math.pow(10, min) ? true : false
}
  
export const percent = (value, min) => {
    return value && value > Math.pow(10, min) ? true : false
}
  
export const isPlus = (value) => {
    return value && value <= 0 ? true : false
}

export const checkDecimal = (num, limit) => {
    const funcCompare = (num, numberFixed) => {
        return num > numberFixed ? true : false
    }
    const Num = Number(num)
    const numberFixed = Number(Num.toFixed(limit))
    
    return funcCompare(Num, numberFixed)
}

export const required = (val) => {
    console.log('발발', val)
    let valid = false
    if (val == null || val === null || val == undefined || val == '') {
        valid = true
    }
    return valid
}
  