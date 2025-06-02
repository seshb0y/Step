import React from "react";
import { Todo } from "../types/Todo";

const TodoItem: React.FC<{
  todo: Todo;
  onToggle: (id: string) => void;
}> = ({ todo, onToggle }) => (
  <li className={`todo-item${todo.completed ? " completed" : ""}`}>
    <span
      className={`checkbox${todo.completed ? " checked" : ""}`}
      onClick={() => onToggle(todo.id)}
      tabIndex={0}
      role="checkbox"
      aria-checked={todo.completed}
    >
      {todo.completed ? "✔" : ""}
    </span>
    <span className="text">{todo.text}</span>
  </li>
);

export default TodoItem;
