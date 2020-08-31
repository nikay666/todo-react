import React from 'react'
import './List.scss'

const List = ({ items }) => {

    return(
        <ul className="list">
            {items.map(item =>  (
                <li 
                    key={item.id}
                    className={item.active ?  'active': ''}
                >
                    {item.icon ?
                        <i>{item.icon}</i>
                        : <i 
                            className={`badge badge--${item.color}`} 
                            // style={{backgroundColor: item.color}}
                        ></i> 
                    }
                    <span>{item.name}</span>
                </li>
            ))}
        </ul>
    )
}

export default List