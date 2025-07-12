// importing hooks
import { useState } from "react";
import { TodoContext } from "./Component/Context/TodoContext";
// importing component
import ToDoList from "./Component/ToDoList";

function App() {
  const [todoArray , setTodoArray] = useState([]);

  return (
  <div style={{marginTop:"60px"}}>
    <TodoContext.Provider value={{todoArray , setTodoArray}}>
      <ToDoList />
    </TodoContext.Provider>
  </div>
  );
}

export default App;
