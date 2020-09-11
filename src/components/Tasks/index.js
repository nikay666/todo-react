import React, { useState, useRef, useEffect }  from 'react'
import  './tasks.scss'
import editSvg  from '../../assets/img/edit.svg'
import axios from 'axios'
import { urlLists } from '../utilits'
import AddTaskForm from './AddTaskForm'


const requestUpdateTitle  = async(id, title) => {
    axios.patch(`${urlLists}/${id}`, {
        name: title
    })
    .catch(() => {
        alert('Не удалось обноовить название списка')
    })
}

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty}) =>{
    const focusTitle = useRef(null);
    const [title, setTitle] = useState(list.name)

    useEffect(() => {  
        setTitle(list.name)
    }, [list])

    const editTitle = (e) =>{ 
        const newTitle =  e.target.value
        setTitle(newTitle)
    } 
    const blurTitle = () =>{
        focusTitle.current.blur();
    }
    const saveTitle = () =>  {
        if(title === list.name) return null
        onEditTitle(list.id,  title)
        requestUpdateTitle(list.id, title)
        setTitle(list.name)
    }

    return (
        <div className="tasks">
            <div className="tasks__title-wrap">
                <h2 className="visually-hidden">{list.name}</h2>

                <input type="text"
                    className={`tasks__title-text`}
                    style={{color: list.color.hex}}
                    ref={focusTitle}
                    onChange={editTitle}
                    onKeyPress={ (e) => e.key === 'Enter' && blurTitle() }
                    onBlur={saveTitle}
                    value={title}
                    size={title && title.length + 2}
                />
   
                <button 
                    className="tasks__edit"
                    onClick={() => focusTitle.current.focus()}
                >
                <img src={editSvg} alt="Редактиировать текст"/>
                </button>
            </div>
            <div className="tasks__items">
                {!withoutEmpty && !list.tasks.length && <p className="tasks__title-disabled">Здесь пока ничего нет :(</p> }
                {
                    //TODO исправить checkbox на доступные
                    list.tasks.map(task => (
                        <div className="tasks__items-row" key={task.id}>
                        <div className="checkbox">
                            <input type="checkbox" name={`task-${task.id}`} id={`task-${task.id}`} />
                            <label htmlFor={`task-${task.id}`} >
                                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                                    <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </label>
                        </div>
                        <input 
                            className="edit-text" 
                            value={task.text}  
                            readOnly
                        />
                        </div>
                    ))
                }
               <AddTaskForm list={list} onAddTask={onAddTask} />
            </div>
        </div>
    )
}

export default Tasks