import React, { useState } from 'react'


type Props = {
    handleAddName: (name:string) => void,
    handleAddNumber: (number:number) => void
}

export const Form: React.FC<Props> = (props) => {
    
    const [number, setNumber] = useState<number>()
    const [name, setName] = useState<string>()


    
    const addNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(Number(event.target.value))
    }
    const addName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    }


    const sendProps = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault();
        if(number != null && name != null){
            props.handleAddName(name)
            props.handleAddNumber(Number(number))
        }

    }

    return (
        <form action="" onSubmit={sendProps}>
            <input type="text" name='name-input' placeholder='enter name' onChange={addName}/>
            <input type="number" name='number-input' placeholder='enter number' onChange={addNumber}/>
            <button>add</button>
        </form>
        )
}
