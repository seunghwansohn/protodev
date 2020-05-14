import React, {useEffect}             from 'react'
import Divider from '@material-ui/core/Divider';


const MarginDivider = ({marginTop, marginBottom, marginLeft, marginRight}) => {
  return (
    <div style = {{marginTop : marginTop, marginBottom : marginBottom}}>
      <Divider/>
    </div>
  )
}

export default MarginDivider