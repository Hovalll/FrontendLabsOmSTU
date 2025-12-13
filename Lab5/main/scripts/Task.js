function Task({ task, onDelete, onToggle }) {
    return (
        <div className={`task ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="task-checkbox"
            />
            <span className="task-text">{task.text}</span>
            <button 
                onClick={() => onDelete(task.id)} 
                className="delete-btn"
            >
                Удалить
            </button>
        </div>
    );
}