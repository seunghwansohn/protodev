export const convertSeqDateTime = (str) => {
    const regexp = /([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})/
    const result = str.match(regexp)
    const obj = {}
    obj.yyyy = result[1]
    obj.yy = result[1].slice(0,2)
    obj.mm = result[2]
    obj.dd = result[3]
    obj.hh = result[4]
    obj.mn = result[5]
    obj.yymmdd = obj.yy + '.' + obj.mm + '.' + obj.dd
    obj.ddmmyy = obj.dd + '.' + obj.mm + '.' + obj.yy
  
    obj.hhmn = obj.hh + ':' + obj.mn
    
    return obj
}