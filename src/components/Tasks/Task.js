import React, { useRef, useState, useEffect } from 'react';
import { editSVG, removeSVG, urlTasksTable } from '../utilits';
import axios from 'axios'

const requestUpdateText  = async(id, text) => {
    axios.patch(`${urlTasksTable}/${id}`, {
        text: text
    })
    .catch(() => {
        alert('Не удалось обновить название списка')
    })
}

const Task = ({id, text, completed,list, onRemove, onEdit, onComplete})  =>   {
    const focusTask = useRef(null)
    const [textTask, setTextTask] =  useState(text);
    const [emptyTask, setEmptyTask] = useState(false)

    useEffect(() => {  
        setTextTask(text)
    }, [text])

    const editTask = (e) => {
        const newText =  e.target.value

        if(newText === ''){
            setEmptyTask(true)
            focusTask.current.focus()
        }else{
            setEmptyTask(false)
        }
        setTextTask(newText)

    }

    const saveTask = ()  => {
        if(emptyTask  === true){
            focusTask.current.focus()
        }
        if(textTask === text ) return null
        
        onEdit(id, textTask, list.id)
        requestUpdateText(id, textTask)
    }

    const onChangeCheckbox = e => {
        onComplete(list.id, id,e.target.checked)
    }
    return (
        <>
        <div className="tasks__items-row">
            <div className="checkbox">
                <input 
                    type="checkbox" 
                    name={`task-${id}`} 
                    id={`task-${id}`} 
                    aria-labelledby={`task-text-${id}`}
                    onChange={onChangeCheckbox}
                    checked={completed}
                />

                <label htmlFor={`task-${id}`} >
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>

            </div>
            <input 
                type="text"
                className="edit-text" 
                value={textTask}  
                id={`task-text-${id}`}
                onChange={editTask}
                ref={focusTask}
                onBlur={saveTask}
                onKeyPress={ (e) => e.key === 'Enter' && focusTask.current.blur() }
            />
                <button 
                    className="tasks__edit"
                    aria-label={`Редактировать задачу ${text}`}
                    onClick={() => focusTask.current.focus()}
                >{editSVG}</button>

                <button 
                    className="tasks__edit"
                    aria-label={`Удалить задачу ${text}`}
                    onClick={() => onRemove(id, text, list.id)}
                >{removeSVG}</button>
        </div>

            {
                emptyTask ?  <p className="error">Задача не может быть пустой</p>  :  null
            }
         </>   
    );
}

export default Task