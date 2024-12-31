import React, { useMemo } from 'react'
import ToDoElement from './ToDoElement'

type Props = {
    tasks: string[]
}

const ToDoList: React.FC<Props> = (props) => {

    const rendTask = useMemo(() => {
        console.log('Rendering tasks...');
        return props.tasks.map((task, index) => 
        <li key={index}>{task}</li>);
    }, [props.tasks]);

  return (
    <ul>
        {/* {props.tasks.map((task, index) => {
            return <ToDoElement key={index} task={task} />
        })} */}
        {rendTask}
    </ul>
  )
}

export default ToDoList