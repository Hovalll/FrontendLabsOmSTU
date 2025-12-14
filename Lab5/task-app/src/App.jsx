import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    if (title.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false
    };
    
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = (id, newTitle) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <div className="container">
        <AddTaskForm onAddTask={addTask} />
        <Filter currentFilter={filter} onFilterChange={setFilter} />
        <TaskList 
          tasks={filteredTasks}
          onDeleteTask={deleteTask}
          onToggleTask={toggleTaskCompletion}
          onUpdateTask={updateTask}
        />
        
        {tasks.length > 0 && (
          <div className="stats">
            <p>Всего задач: {tasks.length}</p>
            <p>Выполнено: {tasks.filter(t => t.completed).length}</p>
            <p>Осталось: {tasks.filter(t => !t.completed).length}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;