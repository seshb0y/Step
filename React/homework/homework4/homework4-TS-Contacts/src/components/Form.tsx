import React, { Component } from 'react'


type Props = {
    handleAddName: (name:string) => void,
    handleAddNumber: (number:number) => void
}

type State = {
    name: string | null,
    number: number | null,
}

export class Form extends Component<Props>{
    state:State = {
        number: null,
        name: null,
      }


    
    setNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({number: Number(event.target.value)})
    }
    setName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({name: event.target.value})
    }

    sendProps = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault();
        if(this.state.number != null && this.state.name != null){
            this.props.handleAddName(this.state.name)
            this.props.handleAddNumber(Number(this.state.number))
        }

    }

    render(): React.ReactNode {
        return (
            <form action="" onSubmit={this.sendProps}>
                <input type="text" name='name-input' placeholder='enter name' onChange={this.setName}/>
                <input type="number" name='number-input' placeholder='enter number' onChange={this.setNumber}/>
                <button>add</button>
            </form>
          )
    }

}
