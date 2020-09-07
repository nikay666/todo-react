import React from 'react'
import classNames from 'classnames'
import axios from  'axios'

import Badge from '../Badge'
import './List.scss'

import removeSVG from '../../assets/img/remove.svg'
import { urlLists } from '../utilits'

const List = ({ items, isRemovable,  onClick,  onRemove, onClickItem, activeItem }) => {

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
                    className={classNames(item.className,
                         {'active': activeItem && activeItem.id ===item.id})}
                    onClick={onClickItem ? () => onClickItem(item) : null}
                    
                >
                    {item.icon ?
                        <i>{item.icon}</i>
                        : <Badge color={item.color.name}/>
                    }
                    <span className="text" title={item.name}>{item.name}</span>
                    <span className="signature">{item.tasks  && `(${item.tasks.length})`}</span>
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