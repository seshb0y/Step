import { Component, ReactNode } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Form } from './components/Form'
import TaskList from './components/TaskList'

type State = {
  number: number[],
  name: string[],
}

class App extends Component{
  state:State = {
    number: [],
    name: [],
  }

  componentDidMount(): void {
      const numbersData = localStorage.getItem("Numbers");
      const namesData = localStorage.getItem("Names");
      if(numbersData && namesData){
          const numbers = JSON.parse(numbersData);
          const names = JSON.parse(namesData);
          this.setState({name: names, number: numbers})
      }
  }

  handleAddNumber = (number: number) => {
    this.setState(
      (prev: State) => {
        const newNumbers = [...prev.number, number];
        localStorage.setItem('Numbers', JSON.stringify(newNumbers));
        return { number: newNumbers };
      }
    );
  }
  handleAddName = (name: string) => {
    this.setState(
      (prev: State) => {
        const newNames = [...prev.name, name];
        localStorage.setItem('Names', JSON.stringify(newNames));
        return { name: newNames };
      }
    );
    
  }
  render(): ReactNode {
    {{console.log(`Name: ${this.state.name} Number:${this.state.number}`)}}
    return(
      <div>
        <Form handleAddName={this.handleAddName} handleAddNumber={this.handleAddNumber}/>
        <TaskList names={this.state.name} numbers={this.state.number} />
      </div>
      
    )
  }
}

export default App
