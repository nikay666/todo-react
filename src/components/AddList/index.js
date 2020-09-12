import React, { useState, useEffect } from 'react'
import List from '../List'
import './AddList.scss'
import Badge from '../Badge'
import closeSVG from '../../assets/img/close.svg'
import {filterColorByID} from '../../components/utilits'
import { urlLists } from '../utilits'
import axios from 'axios'

const AddList = ({items, colors, onAdd}) => {
    const [visible, setVisible ] = useState(false) 
    const [selectedColor, setSelectedColor] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const [disables, setDisabled] = useState(true)
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        if(Array.isArray(colors)){
            setSelectedColor(colors[0].id)
        }
    }, [colors])

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
        setLoading(true)
    
        axios.post(urlLists,  {
            name: inputValue.toString(),
            colorId: selectedColor
        })
        .then(({data}) => { 
            const color  = filterColorByID(colors, selectedColor)
            const listObj  =  {...data, color , tasks:[]}
            onAdd(listObj)
            onClose()
        })
        .finally(() => {
            setLoading(false)
        })
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
                > {loading ? 'Добавление...' : 'Добавить'} </button>
            </div>
            : null
            }
        </div>
    )
}

export default AddList