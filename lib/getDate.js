// export const getDate_yyyymmdd = (Arr, arrangeRules) => {
//     Date.prototype.yyyymmdd = function() {
//         var mm = this.getMonth() + 1; // getMonth() is zero-based
//         var dd = this.getDate();
      
//         return [this.getFullYear(),
//                 (mm>9 ? '' : '0') + mm,
//                 (dd>9 ? '' : '0') + dd
//                ].join('');
//     };
//     var date = new Date();
//     return date.yyyymmdd();
// }


module.exports = {
    getDate_yyyymmddhhmm : () => {
        Date.prototype.yyyymmddhhmm = function() {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();
            var hh = this.getHours();
            var min = this.getMinutes();
    
            return [this.getFullYear(),
                    (mm>9 ? '' : '0') + mm,
                    (dd>9 ? '' : '0') + dd,
                    (hh>9 ? '' : '0') + hh,
                    (min>9 ? '' : '0') + min
                   ].join('');
        };
        var date = new Date();
        return date.yyyymmddhhmm();
    },
    getDate_yyyymmdd : () => {
        Date.prototype.yyyymmdd = function() {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();
        
            return [this.getFullYear(),
                    (mm>9 ? '' : '0') + mm,
                    (dd>9 ? '' : '0') + dd
                ].join('');
        };
        var date = new Date();
        return date.yyyymmdd();
    },
    checkTimeGap : (yyyymmddhhmm1, yyyymmddhhmm2) => {
        let firstLength = yyyymmddhhmm1.length
        let secondLength = yyyymmddhhmm2.length
    
        let hh1st = yyyymmddhhmm1.slice(-4, -2)
        let hh2nd = yyyymmddhhmm2.slice(-4, -2)
    
        let mm1st = parseInt(yyyymmddhhmm1.slice(-2))
        let mm2nd = parseInt(yyyymmddhhmm2.slice(-2))
    
        let hourGap       = hh2nd - hh1st
        let hourGapToMin  = hh1st == hh2nd ? 0 : (hourGap - 1) * 60
    
        let minGap = 0
        if (mm1st > mm2nd) {
            let temp = 60 - mm1st
            minGap = temp + mm2nd
        } else if (mm1st < mm2nd) {
            minGap = mm2nd - mm1st
        }
        let totalGap = hourGapToMin + minGap
        return totalGap
    }
}