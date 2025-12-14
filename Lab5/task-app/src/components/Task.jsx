import { useState } from 'react';

function Task({ task, onDelete, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (editTitle.trim() === '') return;
    onUpdate(task.id, editTitle.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="edit-input"
              autoFocus
            />
            <button onClick={handleSave} className="btn-save">Сохранить</button>
            <button onClick={handleCancel} className="btn-cancel">Отмена</button>
          </div>
        ) : (
          <>
            <span 
              className="task-title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {task.title}
            </span>
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn-edit"
            >
              ✏️
            </button>
          </>
        )}
      </div>
      
      <button 
        onClick={() => onDelete(task.id)} 
        className="btn-delete"
      >
        🗑️
      </button>
    </div>
  );
}

export default Task;