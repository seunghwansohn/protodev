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
<<<<<<< HEAD
=======
        console.log(data)
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
      });
    };
}
export default NewItem