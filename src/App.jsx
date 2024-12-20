// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import DndPage from './pages/DndPage';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Сделать то', completed: false },
    { id: 2, title: 'Сделать это', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>My To-Do List</h1>
              <form onSubmit={addTodo}>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add new task..."
                />
                <button type="submit">Добавить</button>
              </form>

              <div>
                <button onClick={() => setFilter('all')}>Все</button>
                <button onClick={() => setFilter('active')}>Активные</button>
                <button onClick={() => setFilter('completed')}>Завершенные</button>
              </div>

              <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            </div>
          }
        />
        <Route path="/dnd" element={<DndPage />} />
      </Routes>
    </Router>
  );
}

export default App;
