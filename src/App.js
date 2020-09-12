import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Route, useHistory, useLocation } from 'react-router-dom'
import { List, AddList,Tasks, Loader } from './components'
import { addList, urlTasks, urlColors, urlTasksTable, allSVG } from './components/utilits';

function App() {
  const [lists, setLists ] = useState(null)
  const [colors, setColors] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  let history = useHistory()
  let location = useLocation();

  const fetchData  =  async() => {
    axios.get(urlTasks).then(({data}) => {
      setLists(data);
    })
    axios.get(urlColors).then(({data}) => {
      setColors(data)
    })
  }

  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => { 
    const  listId  = location.pathname.split('lists/')[1]
    if(lists){
      const list = lists.find(list => list.id ===  Number(listId))
      setActiveItem(list)
    }
  }, [lists, location.pathname])


  const onAdd = (obj) => {
    const newList  = [...lists,  obj]
    setLists(newList)
  }

  const  onAddTask = (listId, taskObj) =>{ 
    const newList = lists.map(item =>  {
      if(item.id === listId){
        item.tasks = [...item.tasks, taskObj]
      }
      return item
    }) 
    setLists(newList)
  }
  
  const removeItem = (id) => {
    const newList = lists.filter(el => el.id !== id) 
    setLists(newList);
  }

  const onCompleteTask =  (listId, taskId, completed) => {
    const newList  = lists.map(item  => {
      if(item.id === listId){
        item.tasks = item.tasks.map(task => {
          if(task.id === taskId){
            task.completed = completed
          }
          return task
        })
      }
      return item
    })
    setLists(newList)

      axios.patch(`${urlTasksTable}/${taskId}`, {
        completed: completed
      }).catch(() => {
          alert('Не удалось обновить задачу')
      })
  }

  const onClickItem = item =>{
    history.push(`/lists/${item.id}`)
  } 

  const onEditListTitle  = (id, title) => {
    const newList = lists.map(item  => {
      if(item.id === id){
        item.name = title
      }
      return item
    }) 
    setLists(newList);
  }

  const onEditListText  = (id, text, listId) => {
    const newList  = lists.map(item  => {
      if(item.id === listId){
        item.tasks = item.tasks.map(task => {
          if(task.id === id){
            task.text = text
          }
          return  task
        })
      }
      return item
    })
    setLists(newList)
  }

  const onRemoveTask = (id, text, listId) => {
    if(window.confirm(`Вы действительно хотите удалить задачу: "${text}"?`)){
      const newList  = lists.map(item  => {
        if(item.id === listId){
          item.tasks = item.tasks.filter(task => task.id !== id)
        }
        return item
      })
      setLists(newList)

        axios.delete(`${urlTasksTable}/${id}`).catch(() => {
            alert('Не удалось удалить задачу')
        })
    }
  }

  return (
    <div className="todo">
    {!lists ?  <Loader/>  :
      <div className="todo__sidebar" >
        <List  
          items={ [
            {
              id: null,
              icon:  allSVG,
              name: 'Все задачи',
              active: history.location.pathname === '/',
            },
        ]} 
          isRemovable={false} 

          onClickItem={() =>  {
            history.push(`/`)
          }}
        />
        <List  
          items={lists} 
          isRemovable={true} 
          onRemove={removeItem}
          onClickItem={onClickItem}
          activeItem={activeItem}
        />
      
      <AddList onAdd={onAdd} items={addList} colors={colors} />
      </div>
      }
      
      <div className="todo__tasks">

        <Route exact path="/" >
        {  
          lists  && lists.map(list => (
            <Tasks 
            key={list.id}
            list={list} 
            onEditTitle={onEditListTitle} 
            onAddTask={onAddTask}
            withoutEmpty
          /> 
          ))
        
        }
        </Route>
        <Route path="/lists/:id" >
        { lists  && activeItem && 
          <Tasks 
            list={activeItem} 
            onEditTitle={onEditListTitle} 
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onEditListText={onEditListText}
            onCompleteTask={onCompleteTask}
          /> 
        }
        </Route>
      </div>
      
    </div>
  );
}

export default App;
