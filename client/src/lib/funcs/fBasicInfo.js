export const getDateNow = () => {
    const date = new Date()
    let dateObj = {}
    function getFormatDate(date){
        var year = date.getFullYear();              //yyyy
        let shortYear = year.toString().slice(2, 4)
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        
        dateObj.yyyymmdd = year + '' + month + '' + day;
        dateObj.yyyymmdd1 = year + '/' + month + '/' + day
        dateObj.yyyymmdd2 = year + '-' + month + '-' + day
        dateObj.yyyymmdd3 = year + '.' + month + '.' + day

        dateObj.yymmdd = shortYear + month + day
        dateObj.yymmdd1 = shortYear + '/' + month + '/' + day
        dateObj.yymmdd2 = shortYear + '-' + month + '-' + day
        dateObj.yymmdd3 = shortYear + '.' + month + '.' + day

        dateObj.original = date
    }
    getFormatDate(date)
    return dateObj
}