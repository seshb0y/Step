import React, { Component } from 'react'

type Props = {
    numbers: number[],
    names: string[],
}

type State = {
    firstLoad: boolean
}

class TaskList extends Component<Props> {
    state:State = {
        firstLoad: false
    }

    componentDidMount(): void {
        console.log("mounted")
        this.setState({firstLoad: true})
    }


    deleteTask = (event: MouseEvent) => {
        const li = event.currentTarget.parentNode as HTMLElement
        const numbers = JSON.parse(localStorage.getItem("Numbers") || '[]');
        const names = JSON.parse(localStorage.getItem("Names") || '[]');
        const taskText = li.textContent?.trim();
        let index = -1;
        for(let i = 0; i < numbers.length; i+=1){
            if(taskText && taskText.includes(numbers[i].toString())){
                index = i;
                break;
            }
        }
        if(index != - 1){
            numbers.splice(index, 1);
            names.splice(index, 1);
            localStorage.setItem("Numbers", JSON.stringify(numbers));
            localStorage.setItem("Names", JSON.stringify(names))
        }
        li.remove()
    }

    rendElement = (numbers: number[], names:string[]):React.ReactNode => {
        return numbers.map((number, index) => (
            <li key={index}>
              {number} - {names[index]}
              <button onClick={this.deleteTask}>delete</button>
            </li>
          ));
    }

    rendFromDB = () => {
        const numbersData = localStorage.getItem("Numbers");
        const namesData = localStorage.getItem("Names");
        if(numbersData && namesData){
            const numbers = JSON.parse(numbersData);
            const names = JSON.parse(namesData);
            return numbers.map((number:number, index:number) => (
                <li key={index}>
                  {number} - {names[index]}
                  <button onClick={this.deleteTask}>delete</button>
                </li>
              ));
            
        }
        
    }

    render(): React.ReactNode {
        
        return(
            <ul>
                {this.state.firstLoad ? this.rendFromDB() : this.rendElement(this.props.numbers, this.props.names)}
            </ul>
        )
    }
}

export default TaskList