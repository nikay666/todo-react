import React, { useState, useRef, useEffect }  from 'react'
import  './tasks.scss'
import editSvg  from '../../assets/img/edit.svg'
import axios from 'axios'
import { urlLists } from '../utilits'
import AddTaskForm from './AddTaskForm'
import Task from './Task'


const requestUpdateTitle  = async(id, title) => {
    axios.patch(`${urlLists}/${id}`, {
        name: title
    })
    .catch(() => {
        alert('Не удалось обновить название списка')
    })
}

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditListText, onCompleteTask}) =>{
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
                <img src={editSvg} alt="Редактировать текст"/>
                </button>
            </div>
            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <p className="tasks__title-disabled">Здесь пока ничего нет :(</p> }
                {
                    list.tasks && list.tasks.map(task => (
                        <Task  
                            {...task} 
                            list={list} 
                            key={task.id} 
                            onRemove={onRemoveTask}
                            onEdit={onEditListText}
                            onComplete={onCompleteTask}
                        />
                    ))
                }
               <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
            </div>
        </div>
    )
}

export default Tasks