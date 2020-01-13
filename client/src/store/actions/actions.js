

export const INPUTQTY = 'quoteList/INPUTQTY'
export const PICKITEM = 'quoteList/PICKITEM'
export const DELITEM = 'quoteLIst/DELITEM'
export const CHANGEPRATE = 'quoteList/CHANGEPRATE'
export const TOTAL_VALUE = 'quoteList/TOTAL_VALUE'



export const FETCHVNCUSTOMERS = 'clients/FETCHVNCUSTOMERS'

export const ON_DIALOG_OPEN  = 'dialog/ON_DIALOG_OPEN'

export const TEST = 'login/TEST'




export const onDialogOpen = (ox) => ({type: ON_DIALOG_OPEN, ox})

export const onTestSaga = () => ({type: TEST})


export function onFetchClient() {
    return function(callback) {
        return axios.get("/api_s/VNCustomers")
        .then(({ data }) => {
            callback(onFetchClientAct(data))
        });
    };
}



