import React, {
  useEffect, 
  useSelect, 
  useState
}               from "react";
import Button           from '@material-ui/core/Button';

import axios    from 'axios';


const TimeLinePage = () => {
  const onClickCheck = () => {
    console.log('버튼투름')
    const config = {
      headers: {
        'x-access-token' : document.cookie
      },
    }
    const data = {
      user : 'brian',
      expenseCode : '202004261055549',
    }
    axios.post('/api/test/mod', data, config).then(res => {
      console.log(res)
    })
  }
  return(
    <div className="test">
      <Button
       onClick = {onClickCheck}
      >
        확인
      </Button>
    </div>
  )
}

export default TimeLinePage