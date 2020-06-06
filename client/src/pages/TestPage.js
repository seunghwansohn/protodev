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
      }
    }
    axios.post('/api/test/user', 'fefef', config)
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