import React from 'react'
import TaskElement from './TaskElement'
import { useForm } from '../context/FormContext'


export const TaskList = () => {
    const { names, numbers } = useForm();

    if (!names?.length || !numbers?.length) {
        return <p>No contacts available.</p>;
    }

    return (
        <ul>
            {names.map((name, index) => (
                <TaskElement key={index} name={name} number={numbers[index]} />
            ))}
        </ul>
    );
};

