const { useState } = React;

function AddTaskForm({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-form">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите новую задачу..."
                className="task-input"
            />
            <button type="submit" className="add-btn">
                Добавить
            </button>
        </form>
    );
}