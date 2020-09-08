import React, { useState } from  'react'
import { addSVG, urlTasksTable } from '../utilits'
import axios  from 'axios'

const AddTaskForm = ({list, onAddTask}) => {
    const [visible, setVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const toggleFormVisible  = () => {
        setVisible(!visible)
         setInputValue('')
    }

    const addTask = () =>  {
        setLoading(true)
        setDisabled(true)

        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }

        axios.post(urlTasksTable, obj)
        .then(({data}) =>{
            console.log(data);
            onAddTask(list.id, data);
            toggleFormVisible();
        })
        .catch(() => {
            alert('Ошибка при доавлении задачи')
        })
        .finally(() =>{
            setLoading(false)
            setDisabled(false)
        })
    }

    const onChangeInputVlaue = e =>{ 
        e.target.value.length > 0 ? setDisabled(false) : setDisabled(true)
        setInputValue(e.target.value)
    }
    return (
        <div className="tasks__form">
            {!visible ?  
                <div className="tasks__form-new" onClick={toggleFormVisible}>
                   <button className="btn__add">{addSVG}</button>
                   <p className="text">Добавить задачу</p>
               </div>
               :
               <div className="tasks__form-block">
               <input 
                       onChange={onChangeInputVlaue}  
                       value={inputValue} 
                       className="field" 
                       type="text" 
                       placeholder="Текст задачи"
                       autoFocus
                   />
               <button 
                        className="btn btn-primary btn-bold"
                        onClick={addTask}
                        disabled={disabled}
                >{loading ?  'Задача добавляется...' : 'Добавить задачу'}</button>
   
               <button 
                    className="btn btn-gray btn-bold"
                    onClick={toggleFormVisible}
                >Отмена</button>
               </div>
            }

        </div>
    )
}

export default AddTaskForm