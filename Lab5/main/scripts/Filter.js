function Filter({ currentFilter, onFilterChange }) {
    return (
        <div className="filter">
            <label>
                <input
                    type="radio"
                    value="all"
                    checked={currentFilter === 'all'}
                    onChange={() => onFilterChange('all')}
                />
                Все задачи
            </label>
            
            <label>
                <input
                    type="radio"
                    value="active"
                    checked={currentFilter === 'active'}
                    onChange={() => onFilterChange('active')}
                />
                Активные
            </label>
            
            <label>
                <input
                    type="radio"
                    value="completed"
                    checked={currentFilter === 'completed'}
                    onChange={() => onFilterChange('completed')}
                />
                Выполненные
            </label>
        </div>
    );
}