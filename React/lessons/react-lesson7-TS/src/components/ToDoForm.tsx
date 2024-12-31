import React from 'react'

type Props = {
    onSubmit: (event:React.FormEvent) => void
}

const ToDoForm: React.FC<Props> = (props) => {

  return (
    <form action="" onSubmit={props.onSubmit}>
        <input type="text" name='task'/>
        <button>add</button>
    </form>
  )
}

export default ToDoForm