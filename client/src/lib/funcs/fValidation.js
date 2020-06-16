//Validation기능
export const checkValid = (colAttr, index, header, value) => {
let tempArr = []
let funcs = {    
    number : value => value && isNaN(Number(value)) ? 'Only Number' : undefined,
    code   : value => value && hasWhiteSpace(value) ? 'Space(x)' : undefined,
    string   : value => undefined,
    percent   : value => value && percent(value) ? 'Space(x)' : undefined,
    decimal : value => value && hasWhiteSpace(value) ? 'Space(x)' : undefined,
    plus : value => value && isPlus(value) ? 'only Plus or 0' : undefined,
    minValue15 : value => value && maxValue(value, 15) ? 'Value is exceed maximum' : undefined,
    maxValue5 : value => value && maxValue(value, 5) ? 'Value is exceed maximum' : undefined,
    max1 : value => value && maxValue(value, 1) ? 'Value is exceed maximum' : undefined,
    max15 : value => value && maxValue(value, 15) ? 'Value is exceed maximum' : undefined,
    decimal2 : value => value && checkDecimal(value, 2) == true ? '1.xx (o), 1.xxx (x)' : undefined,
    required : value => (value !== undefined || value !== null) && required(value) == true ? 'required' : undefined
}
if (colAttr[header].validate) {
    colAttr[header].validate.map(str => {
    if (funcs[str] && funcs[str](value) !== undefined) {
        tempArr.push(funcs[str](value))
    }
    })
}
return tempArr
}

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
    let valid = false
    if (val == null || val === null || val == undefined || val == '') {
        valid = true
    }
    return valid
}
  