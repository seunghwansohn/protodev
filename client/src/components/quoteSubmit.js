import React from 'react'
import { post } from 'axios';

export default function EnhancedTable(props) {
    console.log(props.pickedItem)

    // addQuote = () => {
    //     const url = '/api/quotes';
    //     const 
    // }
    const onSubmit = () => {
        console.log(props.pickedItem)
        const url = '/api/quoteSubmit'
        const pickedItem = JSON.stringify(props.pickedItem)
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        return post(url, pickedItem, config)
    }
    return (
        <div>
            <button type = "submit" onClick = {onSubmit}>submit</button>
        </div>
    )
}

  
