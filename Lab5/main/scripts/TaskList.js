function TaskList({ tasks, onDelete, onToggle }) {
    if (tasks.length === 0) {
        return <div style={{textAlign: 'center', padding: '20px', color: '#6c757d'}}>
            Задачи не найдены
        </div>;
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}