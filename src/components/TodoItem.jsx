// src/components/TodoItem.jsx
import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
    </div>
  );
}

export default TodoItem;
