import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Form } from './components/Form'
import TaskList from './components/TaskList'

const App = () => {

  const [numbers, setNumber] = useState<number[]>([])
  const [names, setName] = useState<string[]>([])

  useEffect(() => {
    const numbersData = localStorage.getItem("Numbers");
    const namesData = localStorage.getItem("Names");
    if(numbersData && namesData){
        const numbers = JSON.parse(numbersData);
        const names = JSON.parse(namesData);
        setNumber(numbers);
        setName(names);
    }
  }, [])



  const handleAddNumber = (number: number) => {
    setNumber(
      (prev) => {
        const newNumbers = [...prev, number];
        localStorage.setItem('Numbers', JSON.stringify(newNumbers));
        return newNumbers;
      }
    );
  }
  const handleAddName = (name: string) => {
    setName(
      (prev) => {
        const newNames = [...prev, name];
        localStorage.setItem('Names', JSON.stringify(newNames));
        return newNames;
      }
    );
    
  }
  {{console.log(`Name: ${names} Number:${numbers}`)}}
  return(
    <div>
      <Form handleAddName={handleAddName} handleAddNumber={handleAddNumber}/>
      <TaskList names={names} numbers={numbers} />
    </div>
    
  )
}

export default App
