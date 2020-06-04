export const CBM = (x, y, z) => {
    return Math.round(x * y * z * 0.01 * 0.01 * 0.01 * 100000000)/100000000
}

export const seaFreight = (CBM) => {
    return Math.round(CBM * 90000)
}

export const airFreight = (weight) => {
    return weight * 1750
}

export const deliveryKorea = (weight) => {
    return weight * 100
}

export const STKVPrice = (stkVVar, buyingPrice) => {
    return Math.round(buyingPrice / 1000 * stkVVar * 10)/10
}

export const segeroPay = (STKVPrice) => {
    return Math.round(STKVPrice * 0.02 * 10)/10
}

export const importTax = (importTaxRate, STKVPrice) => {
    return Math.round(STKVPrice * importTaxRate * 0.01* 10)/10
}

export const packingFee = (CBM) => {
    return Math.round(CBM * 75000 * 10)/10
}

export const VNSellingP = (STKVPrice, importTax, STKCVar) => {
    return Math.round(((STKVPrice + importTax) * STKCVar)*10)/10
}

export const defaultFreight = (seaFreight, packingFee, exchangeRate) => {
    return Math.round(((seaFreight + packingFee)/exchangeRate *10))/10
}

export const buyingPriceUSD = (KRW, exchangeRateKRW) => {
    return Math.round(KRW/exchangeRateKRW *10)/10
}

export const costKR = (defaultFreight, segeroPay, buyingPrice) => {
    return Math.round((defaultFreight + segeroPay + buyingPrice) * 10)/10
}

export const costVN = (importTax, STKVPrice) => {
    return Math.round((importTax + STKVPrice) * 10)/10
}

export const profitKR = (STKVPrice, costKR) => {
    return Math.round((STKVPrice - costKR) * 10)/10
}

export const profitVN = (VNSellingP, costVN) => {
    return Math.round((VNSellingP - costVN) * 10)/10
}


export const profitCost = (profit, cost) => {
    return Math.round((profit/cost) * 10000)/100
}
