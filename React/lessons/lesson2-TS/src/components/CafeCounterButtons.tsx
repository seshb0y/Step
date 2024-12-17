import React from 'react'

interface Props{
    incrementGood: () => void;
    incrementBad: () => void;
    incrementNeutral: () => void;
    reset: () => void
}


const CafeCounterButtons: React.FC<Props> = (props) => {
  return (
    <div>
        <button onClick={props.incrementGood}>Good</button>
        <button onClick={props.incrementBad}>Neutral</button>
        <button onClick={props.incrementNeutral}>Bad</button>
        <button onClick={props.reset}>Reset</button>
    </div>
    
  )
}

export default CafeCounterButtons