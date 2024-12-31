import React from 'react'

const ToDoElement = (props) => {
  return (
    <li key={props.index}>
        {props.task}
    </li>
  )
}

export default ToDoElement