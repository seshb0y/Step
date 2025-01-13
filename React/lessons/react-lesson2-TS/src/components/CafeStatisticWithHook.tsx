import React, { useState } from 'react'
import CafeCounterButtons from './CafeCounterButtons';

// type State = {
//     goodState: number;
//     neutralState: number;
//     badState: number;
//     totalState: number;
//     positiveState: string;
// }

const CafeStatisticWithHook = () => {
    // state:State = {
    //     goodState: 0,
    //     neutralState: 0,
    //     badState: 0,
    //     totalState: 0,
    //     positiveState: "0%",
    // }
    const [statistics, setStatistics] = useState({
        goodState: 0,
        neutralState: 0,
        badState: 0,
        totalState: 0,
        positiveState: "0%",
    })

    const calculatePositive = () => {
        const {goodState, totalState} = statistics;
        const positive = goodState / totalState * 100;
        setStatistics((prevState) => ({...prevState, positiveState: `${positive}`}));
    }


  const incrementGood = () => {
    setStatistics((prevState) => {
      const updatedState = {
        ...prevState,
        goodState: prevState.goodState + 1,
        totalState: prevState.totalState + 1,
      };
      return updatedState;
    });
    setTimeout(calculatePositive, 0);
  };

  const incrementNeutral = () => {
    setStatistics((prevState) => {
      const updatedState = {
        ...prevState,
        neutralState: prevState.neutralState + 1,
        totalState: prevState.totalState + 1,
      };
      return updatedState;
    });
    setTimeout(calculatePositive, 0);
  };

  const incrementBad = () => {
    setStatistics((prevState) => {
      const updatedState = {
        ...prevState,
        badState: prevState.badState + 1,
        totalState: prevState.totalState + 1,
      };
      return updatedState;
    });
    setTimeout(calculatePositive, 0);
  };

    const reset = () => {
        setStatistics({
            goodState: 0,
            neutralState: 0,
            badState: 0,
            totalState: 0,
            positiveState: "0%",
        })
    }
    


    // render(){
        return (
            <div>
                <h1>Sip Happens Cafe</h1>
                <p>Please leave your feedback about our service by selecting one of the option bellow.</p>
                <CafeCounterButtons incrementGood={incrementGood}
                 reset={reset}
                 incrementBad={incrementBad}
                 incrementNeutral={incrementNeutral}/>
                <div>
                    <p>Good: {statistics.goodState}</p>
                    <p>Neutral: {statistics.neutralState}</p>
                    <p>Bad: {statistics.badState}</p>
                    <p>Total: {statistics.totalState}</p>
                    <p>Positive: {statistics.positiveState}</p>
                </div>

            </div>
            
          )
    // }
}

export default CafeStatisticWithHook