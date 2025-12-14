import Task from './Task';

function TaskList({ tasks, onDeleteTask, onToggleTask, onUpdateTask }) {
  if (tasks.length === 0) {
    return <p className="no-tasks">Нет задач для отображения</p>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onToggle={onToggleTask}
          onUpdate={onUpdateTask}
        />
      ))}
    </div>
  );
}

export default TaskList;