import React from 'react'
import classNames from 'classnames'
import axios from  'axios'

import Badge from '../Badge'
import './List.scss'

import removeSVG from '../../assets/img/remove.svg'
import { urlLists } from '../../App'

const List = ({ items, isRemovable,  onClick,  onRemove }) => {

    const removeList = (item) =>{ 
        if(window.confirm(`Вы действительно хотите удалить элемент ${item.name}?`)){
            axios.delete(`${urlLists}/${item.id}`)
            .then(() => onRemove(item.id))
        }  
    }
    
    return(
        <ul className="list"  onClick={onClick} >
            {items.map(item =>  (
                <li 
                    key={item.id}
                    className={classNames(item.className, {'active': item.active})}
                    
                >
                    {item.icon ?
                        <i>{item.icon}</i>
                        : <Badge color={item.color.name}/>
                    }
                    <span title={item.name}>{item.name}</span>
                    { isRemovable && 
                        <button 
                            aria-label="удалить элемент" 
                            className="list__remove" 
                            onClick={() => removeList(item)}
                        ><img src={removeSVG} alt="Удалить элемент"/> </button>
                    }
                </li>
            ))}
        </ul>
    )
}

export default List