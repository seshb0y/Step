import React from "react";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

const TodoList: React.FC<{
  todos: Todo[];
  onToggle: (id: string) => void;
}> = ({ todos, onToggle }) => (
  <ul>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
    ))}
  </ul>
);

export default TodoList;
