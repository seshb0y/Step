import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FormProvider } from './context/FormContext'
import { Form } from './components/Form'
import { TaskList } from './components/TaskList'

function App() {
  const [count, setCount] = useState(0)

  // localStorage.clear()
  return (
    <FormProvider>
      <Form/>
      <TaskList/>
    </FormProvider>
  )
}

export default App
