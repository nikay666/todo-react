import React, { useState } from 'react'
import List from '../List'
import './AddList.scss'
import Badge from '../Badge'
import closeSVG from '../../assets/img/close.svg'
import {filterColorByID} from '../../App'

const AddList = ({items, colors, onAdd}) => {
    const [visible, setVisible ] = useState(false) 
    const [selectedColor, setSelectedColor] = useState(colors[0].id)
    const [inputValue, setInputValue] = useState('')
    const [disables, setDisabled] = useState(true)

    const onClose =  () => {
        setVisible(false)
        setDisabled(true)
        setInputValue('')
        setSelectedColor(colors[0].id)
    }

    const changeInputValue =  (e) => {
        e.target.value ? setDisabled(false) : setDisabled(true)
        setInputValue(e.target.value)
    }

    const addList = () => {
        const id = `f${(~~(Math.random()*1e8)).toString(16)}`;
        onAdd( {
            "id": id,
            "name": inputValue.toString(),
            "colorID":  selectedColor,
            "color":  filterColorByID(colors, selectedColor)
        })
        onClose()
    }

    const EnterVlaue = (e) => {
        console.log(e.key)
        if(e.key === 'Enter'){
           return disables === false ? addList() :  null
        }
    }

    return(
        <div className="add-list" onKeyPress={EnterVlaue}>
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
                    onClick={onClose}
                >
                    <img className="close-btn__img" src={closeSVG} alt=""/>
                </button>

               <input 
                    onChange={changeInputValue}  
                    value={inputValue} className="field" 
                    type="text" 
                    placeholder="Назване спииска"
                    autoFocus
                />
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
                    
                <button 
                    className="btn btn-primary"
                    onClick={addList}
                    disabled={disables}
                >Добавить</button>
            </div>
            : null
            }
        </div>
    )
}

export default AddList