import React, { Component } from 'react'

type State = {
    counterValue: number;
}

export default class Counter extends Component{
    state:State = {
        counterValue: 0,
    }

    increment = () => {
        this.setState((prev:State) => ({counterValue: prev.counterValue + 1}));
    }

    decrement = () => {
        this.setState((prev:State) => ({counterValue: prev.counterValue - 1}));
    }

    componentDidMount(): void {
        console.log("component mounted")
        const value = localStorage.getItem("Value")
        this.setState((prev:State) => ({counterValue: prev.counterValue = JSON.parse(value)}))
    }

    componentWillUnmount(): void {
        console.log("component unmounted");
    }

    componentDidUpdate(): void {
        console.log("component updated")
        localStorage.setItem("Value", JSON.stringify(this.state.counterValue))
    }

    render(): React.ReactNode {
        return (
            <div>
                <h2>result = {this.state.counterValue}</h2>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
            </div>
          )
    }

}