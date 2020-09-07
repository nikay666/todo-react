import React, { useState, useEffect } from 'react'
import { List, AddList,Tasks, Loader } from './components'

import axios from 'axios'
import { addList, titleItems, urlTasks, urlColors } from './components/utilits';

function App() {
  const [lists, setLists ] = useState(null)
  const [colors, setColors] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  async function fetchData(){
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

  if(!lists){
    return  <Loader/>
  }

  const onAdd = (obj) => {
    const newList  = [...lists,  obj]
    setLists(newList)
  }
  
  const removeItem = (id) => {
    const newList = lists.filter(el => el.id !== id) 
    setLists(newList);
  }

  const onClickItem = item =>{
    setActiveItem(item)
    console.log(activeItem)
  } 

  const onEditListTitle  = (id, title) => {
    console.log(id, title)
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
      <div className="todo__sidebar" >
        <List  
          items={titleItems} 
          isRemovable={false} 
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
      <div className="todo__tasks">
        { activeItem && 
          <Tasks 
            list={activeItem} 
            onEditTitle={onEditListTitle} 
          /> 
        }
      </div>
    </div>
  );
}

export default App;
