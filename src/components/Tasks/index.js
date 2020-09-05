import React  from 'react'
import  './tasks.scss'
import editSvg  from '../../assets/img/edit.svg'

const Tasks = () =>{
    return (
        <div className="tasks">
          <h2 className="tasks__title">
                Фронтенд
                <button className="tasks__edit"><img src={editSvg} alt="Редактиировать текст"/></button>
            </h2>
            <div className="tasks__items">
                <div className="tasks__items-row">
                    <div className="checkbox">
                        <input type="checkbox" name="01" id="01"/>
                        <label htmlFor="01">
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                                <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </label>
                    </div>
                    <input type="text" className="edit-text" value='ReactJS Hooks (useState, useReducer, useEffect и т.д.'/>
                </div>
                <div className="tasks__items-row">
                    <div className="checkbox">
                        <input type="checkbox" name="02" id="02"/>
                        <label htmlFor="02">
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                                <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </label>
                    </div>
                    <p>ReactJS Hooks (useState, useReducer, useEffect и т.д.)</p>
                </div>

            </div>
        </div>
    )
}

export default Tasks