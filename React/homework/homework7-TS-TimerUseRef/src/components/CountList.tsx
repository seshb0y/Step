import React, { memo } from 'react'

interface Props{
    handleRendHistory: () => React.ReactNode;
}

const CountList: React.FC<Props> = memo((props) => {
    
    return(
        <>
            {props.handleRendHistory()}
        </>
    )
})

export default CountList