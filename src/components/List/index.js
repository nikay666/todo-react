import React from 'react'
import './List.scss'
import classNames from 'classnames'
import Badge from '../Badge'

const List = ({ items, isRemovable,  onClick }) => {
    
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
                    {
                        isRemovable ? 
                        <i>
                        </i>
                        : null
                    }
                </li>
            ))}
        </ul>
    )
}

export default List