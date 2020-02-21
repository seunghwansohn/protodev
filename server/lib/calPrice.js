//하위객체를 또 가지고 있는 객체의 경우
//하위 객체 값을 모두 단층화 시키는 메소드임.
module.exports = {
    VNSellP : function(itemObjArr) {
            let resultArr = []
            itemObjArr.map(obj => {
                if (obj.stkVVar !== null && 
                    obj.stkCVar !== null && 
                    obj.buyingPKR !== null && 
                    obj.importTaxRate !== null
                ) {
                    obj.VNSellP = obj.stkVVar * obj.buyingPKR
                }
            })
            return resultArr
        }
}