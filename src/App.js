import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Route, useHistory, useLocation } from 'react-router-dom'
import { List, AddList,Tasks, Loader } from './components'
import { addList, titleItems, urlTasks, urlColors } from './components/utilits';

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

 

  return (
    <div className="todo">
    {!lists ?  <Loader/>  :
      <div className="todo__sidebar" >
        <List  
          items={titleItems} 
          isRemovable={false} 

          onClickItem={item =>  {
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
          /> 
        }
        </Route>
      </div>
      
    </div>
  );
}

export default App;
