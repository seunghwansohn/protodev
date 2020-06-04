import React from 'react';
import Button from '../button/Button'
import {camelize} from '../../lib/funcs/fString'

export default function ButtonHeader ({type, onHeaderButton, isThereSelected}) {
    const buttons = []
    const addItemButton = {
      title : "Item Add",
      camelTitle : camelize("Item Add")
    }
    const checkButton = {
        title : "Check"
    }
    const newCopied = {
        title : 'Copy Item'
    }
    const addClient = {
        title : 'Add Client'
    }
    const addSupplier = {
        title : 'Add Supplier'
    }
    
    switch (type) {
        case 'itemList' :
            buttons.push(addItemButton)
            buttons.push(checkButton)
            buttons.push(addSupplier)
            if(isThereSelected == true) {
                buttons.push(newCopied)
            }
        case 'client' :
            buttons.push(addClient)
            if(isThereSelected == true) {
                buttons.push(newCopied)
            }
            
    }

    return (
        <> 
            {buttons.map(button => 
                <Button 
                    type = {camelize(button.title)} 
                    onClick = {() => onHeaderButton(camelize(button.title))}
                >
                    {button.title}
                </Button>)}
        </>

    );
}
