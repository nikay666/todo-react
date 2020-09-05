import React from 'react'
import './List.scss'
import classNames from 'classnames'
import Badge from '../Badge'

import removeSVG from '../../assets/img/remove.svg'

const List = ({ items, isRemovable,  onClick,  onRemove }) => {
    
    return(
        <ul className="list"  onClick={onClick} >
            {items.map(item =>  (
                <li 
                    key={item.id}
                    className={classNames(item.className, {'active': item.active})}
                    
                >
                    {item.icon ?
                        <i>{item.icon}</i>
                        : <Badge color={item.color}/>
                    }
                    <span title={item.name}>{item.name}</span>
                    { isRemovable && 
                        <button 
                            aria-label="удалить элемент" 
                            className="list__remove" 
                            onClick={() => onRemove(item)}
                        ><img src={removeSVG} alt="Удалить элемент"/> </button>
                    }
                </li>
            ))}
        </ul>
    )
}

export default List