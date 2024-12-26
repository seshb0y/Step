import React, { useState } from 'react'
import { useForm } from '../context/FormContext'



export const Form = () => {

    const {addContact} = useForm();


    const onSubmit = (event:React.MouseEvent):void => {
        event.preventDefault();

        const form = event.currentTarget;
        const inputName = (form.querySelector("input[name='name']") as HTMLInputElement).value;
        const inputNumber = (form.querySelector("input[name='number']") as HTMLInputElement).value;
        // console.log(inputNumber, inputName)
        addContact(inputName, inputNumber)
    }
    

  return (
    <form action="" onSubmit={onSubmit}>
        <input type="text" name='name' placeholder='enter name'/>
        <input type="text" name='number' placeholder='enter number'/>
        <button>submit</button>
    </form>
  )
}
