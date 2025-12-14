import { useState } from 'react';

function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    
    onAddTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Введите новую задачу..."
        className="task-input"
      />
      <button type="submit" className="btn-add">
        Добавить
      </button>
    </form>
  );
}

export default AddTaskForm;