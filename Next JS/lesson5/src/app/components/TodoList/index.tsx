import { getTodos } from "@/app/todo/action";
import React from "react";

const TodoList = async () => {
  const todo = await getTodos();
  console.log(todo);
  return (
    <ul>
      {todo.map((el) => (
        <li key={el.id} className="bg-gray-500 rounded p-2">{el.title}</li>
      ))}
    </ul>
  );
};

export default TodoList;
