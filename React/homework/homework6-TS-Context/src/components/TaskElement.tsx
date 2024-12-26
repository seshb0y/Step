import React, { useEffect } from 'react'
import { useForm } from '../context/FormContext'
import style from './Form.module.css'

type Props = {
    name: string;
    number: string;
}

const TaskElement:React.FC<Props> = (props) => {

    const {deleteContact} = useForm();

    const deleteLi = (event: React.MouseEvent) => {
        const btn = event.target
        // console.log(btn)
        const li = btn.closest("li") as HTMLElement
        if(li.textContent?.includes(props.name)){
            deleteContact(props.name, props.number)
            // li.remove()
        }
        // window.location.reload();
        
    }

    // const rendLi = (names: string[], numbers: string[]) => {
    //     console.log(names, numbers)
    //     if(names && numbers){
    //         return names.map((name, index) => (
    //             <li key={index} className={style.list}>
    //                 <p className="names">Name: {name}</p>
    //                 <p className="numbers"> Number: {numbers[index]}</p>
    //                 <button onClick={deleteLi}>Delete</button>
    //             </li>
                
    //         ));
    //     }
    //   };

  return (
    <li key={props.index}>
        Name: {props.name} Number: {props.number}
        <button type='submit' onClick={deleteLi}>Delete</button>
    </li>
  )
}

export default TaskElement