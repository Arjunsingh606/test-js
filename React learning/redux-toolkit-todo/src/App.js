import './App.css';
import TodoInput from './component/TodoInput';
import Todos from './component/Todos';

const  App =() =>{
  return (
    <div className="App">
     <TodoInput/>
     <Todos/>
    </div>
  );
}

export default App;
