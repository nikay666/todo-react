import React  from 'react'
import  './tasks.scss'
import editSvg  from '../../assets/img/edit.svg'

const Tasks = ({list}) =>{
    console.log(list)

    return (
        <div className="tasks">
          <h2 className="tasks__title">
                {list.name}
                <button className="tasks__edit"><img src={editSvg} alt="Редактиировать текст"/></button>
            </h2>
            <div className="tasks__items">
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
            </div>
        </div>
    )
}

export default Tasks