import produce from 'immer'

const initialState = {
    VNbuyer : []
}

// export function onFetchClient() {
//     return function(callback) {
//         return axios.get("/api_s/VNCustomers")
//         .then(({ data }) => {
//             callback(onFetchClientAct(data))
//         });
//     };
// }

export const onFetchClientAct = (VNCustomersList) => ({type: FETCHVNCUSTOMERS, VNCustomersList});

export const FETCHVNCUSTOMERS = 'clients/FETCHVNCUSTOMERS'

function reducer (state = initialState, action) {
    switch (action.type) {
        case FETCHVNCUSTOMERS:
            return produce(state, draft => {
            draft.VNbuyer = action.VNCustomersList
            }) 
        case FETCHVNCUSTOMERS:
            return produce(state, draft => {
                draft.clients.VNbuyer = action.VNCustomersList
            }) 
        default:
            return state;
    } 
}

export default reducer
