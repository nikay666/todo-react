import React, { useState } from 'react'
import List from '../List'
import './AddList.scss'
import Badge from '../Badge'
import closeSVG from '../../assets/img/close.svg'

const AddList = ({items, colors}) => {
    const [visible, setVisible ] = useState(false) 
    const [selectedColor, setSelectedColor] = useState(colors[0].id)
    


    return(
        <div className="add-list">
            <List  
                items={items} 
                isRemovable={false} 
                onClick={() => setVisible(true) }
            />
            {visible ? 
            <div className="add-list__popup">
                <button 
                    className="close-btn" 
                    aria-label='Закрыть окно создания нового списка'
                    onClick={() => setVisible(false)}
                >
                    <img className="close-btn__img" src={closeSVG} alt=""/>
                </button>

               <input className="field" type="text" placeholder="Назване спииска" />
               <div className="add-list__popup-colors">
                   <ul>
                       {colors.map(color => 
                            <li key={color.id}>
                                <Badge 
                                    color={color.name}
                                    onClick={() => setSelectedColor(color.id)} 
                                    className={selectedColor === color.id && 'active' }
                                />
                            </li>
                       )}
                     
                   </ul>
               </div>
                <button className="btn btn-primary">Добавить</button>
            </div>
            : null
            }
        </div>
    )
}

export default AddList