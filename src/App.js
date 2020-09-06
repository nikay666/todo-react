import React, { useState, useEffect } from 'react'
import { List, AddList,Tasks, Loader } from './components'

// import DB from './assets/db.json';
import axios from 'axios'
import { addList, titleItems } from './components/utilits';

export const urlListsColor = 'http://localhost:3001/lists?_expand=color'
export const urlColors = 'http://localhost:3001/colors'
export const urlLists = 'http://localhost:3001/lists'
export const urlTasks=  'http://localhost:3001/lists?_expand=color&_embed=tasks'


function App() {
  async function fetchData(){
    axios.get(urlTasks).then(({data}) => {
      setLists(data);
    })
    axios.get(urlColors).then(({data}) => {
      setColors(data)
    })
  }

  const [lists, setLists ] = useState(null)
  const [colors, setColors] = useState(null)

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
        />
      <AddList onAdd={onAdd} items={addList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Tasks list={lists[1]} />
      </div>
    </div>
  );
}

export default App;
