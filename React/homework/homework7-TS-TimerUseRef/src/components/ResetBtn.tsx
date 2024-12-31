import React, { memo } from 'react'

interface Props{
    resetTimer: () => void
}

const ResetBtn: React.FC<Props> = memo((props) => {
  return (
    <button onClick={props.resetTimer}>reset</button>
  )
})

export default ResetBtn