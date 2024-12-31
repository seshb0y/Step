import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoForm from './components/ToDoForm'
import ToDoList from './components/ToDoList'

function App() {

  const [tasks, setTasks] = useState<string[]>([])

  const handleAddTask = (event:React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget;
    const task = form.task.value;
    setTasks((prev) => [...prev, task])
  }




  return (
    <>
    <ToDoForm onSubmit={handleAddTask}/>
    <ToDoList tasks={tasks}/>
    </>
  )
}

export default App
