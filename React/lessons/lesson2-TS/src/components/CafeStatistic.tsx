import React, { Component } from 'react'
import CafeCounterButtons from './CafeCounterButtons';

type State = {
    goodState: number;
    neutralState: number;
    badState: number;
    totalState: number;
    positiveState: string;
}

export default class CafeStatistic extends Component{
    state:State = {
        goodState: 0,
        neutralState: 0,
        badState: 0,
        totalState: 0,
        positiveState: "0%",
    }

    incrementGood = () => {
        this.setState((prevState:State) => ({
            goodState: prevState.goodState + 1,
            totalState: prevState.totalState + 1,
          }), this.calculatePositive);
    }
    incrementNeutral = () => {
        this.setState((prevState:State) => ({
            neutralState: prevState.neutralState + 1,
            totalState: prevState.totalState + 1,
          }), this.calculatePositive);
    }
    incrementBad = () => {
        this.setState((prevState:State) => ({
            badState: prevState.badState + 1,
            totalState: prevState.totalState + 1,
          }), this.calculatePositive);
    }
    reset = () => {
        this.setState({
            goodState: 0,
            neutralState: 0,
            badState: 0,
            totalState: 0,
            positiveState: "0%",
        })
            }
    
    calculatePositive = () => {
        const {goodState, totalState} = this.state;
        const positive = goodState / totalState * 100;
        this.setState({positiveState: `${positive}%`});
    }

    render(){
        return (
            <div>
                <h1>Sip Happens Cafe</h1>
                <p>Please leave your feedback about our service by selecting one of the option bellow.</p>
                <CafeCounterButtons incrementGood={this.incrementGood}
                 reset={this.reset}
                 incrementBad={this.incrementBad}
                 incrementNeutral={this.incrementNeutral}/>
                <div>
                    <p>Good: {this.state.goodState}</p>
                    <p>Neutral: {this.state.neutralState}</p>
                    <p>Bad: {this.state.badState}</p>
                    <p>Total: {this.state.totalState}</p>
                    <p>Positive: {this.state.positiveState}</p>
                </div>

            </div>
            
          )
    }
}

