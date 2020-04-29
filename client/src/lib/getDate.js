export const getDate_yyyymmdd = (Arr, arrangeRules) => {
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
}


export const getDate_yyyymmddhhmm = (Arr, arrangeRules) => {
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
}
