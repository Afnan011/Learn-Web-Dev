import { useState } from 'react';
import './App.css';



function App() {

  const [task, setTask] = useState("")
  const [todos, setTodos] = useState([]);  
  const [globalId, setGlobalId] = useState(0);
  
    function updateTask(event) {
        setTask(event.target.value)
    }
  
    function updateTodoList() {
      if(task !== ""){
        setTodos(oldList => {
          return [...oldList, {id: globalId, todo: task}]
        })
        setGlobalId(globalId + 1);
      }
      setTask("");
    }
    
  
  function checkKeyPress(e){
    if(e.key === 'Enter'){
      updateTodoList()
    }  
  }

  function deleteItem(itemID){
    setTodos(oldList => {
      return oldList.filter(item => item.id !== itemID)
    })
  }

  return (
    <div className='App'>
      <h1>ToDO List</h1>
      <div className='todoListContainer'>
        <input
         type="text" 
         onKeyDown={checkKeyPress}
         value={task} 
         onChange={updateTask}/>
        <button onClick={updateTodoList}>Add</button>
      </div>
      <ul>
      {todos.map((item, idx) => {
        return <div key={idx} className='todoItem'>
          <li>{item.todo}</li>
          <button className='dltButton' onClick={()=> deleteItem(item.id)}>❌</button>
        </div>
      })}
      </ul>
    </div>
  );
}

export default App;
