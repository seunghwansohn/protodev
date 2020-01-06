import React from 'react'
const axios = require('axios');

const NewItem = () => {
    return (
        <div>
            지랄랄
        </div>
    )

}

function onFetchItem() {
    return function(callback) {
      return axios.get("/api/customers")
        .then(({ data }) => {
        console.log(data)
      });
    };
}
export default NewItem