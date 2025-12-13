const { useState, useEffect } = React;

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    // Загружаем задачи из localStorage при загрузке
    useEffect(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            setTasks(JSON.parse(saved));
        }
    }, []);

    // Сохраняем задачи в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Добавление задачи
    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        setTasks([...tasks, newTask]);
    };

    // Удаление задачи
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Переключение статуса
    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Фильтрация задач
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    // Статистика
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const activeTasks = totalTasks - completedTasks;

    return (
        <div className="app">
            <h1>✅ Менеджер задач</h1>
            
            <AddTaskForm onAdd={addTask} />
            
            <Filter currentFilter={filter} onFilterChange={setFilter} />
            
            <TaskList 
                tasks={filteredTasks}
                onDelete={deleteTask}
                onToggle={toggleTask}
            />
            
            <div className="stats">
                Всего: {totalTasks} | ✅ Выполнено: {completedTasks} | ⏳ Активных: {activeTasks}
            </div>
        </div>
    );
}

// Запускаем приложение
ReactDOM.render(<App />, document.getElementById('root'));