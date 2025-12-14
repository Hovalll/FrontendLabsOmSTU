function Filter({ currentFilter, onFilterChange }) {
  return (
    <div className="filter">
      <h3>Фильтр задач:</h3>
      <div className="filter-options">
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
            value="pending"
            checked={currentFilter === 'pending'}
            onChange={() => onFilterChange('pending')}
          />
          Только активные
        </label>
        
        <label>
          <input
            type="radio"
            value="completed"
            checked={currentFilter === 'completed'}
            onChange={() => onFilterChange('completed')}
          />
          Только выполненные
        </label>
      </div>
    </div>
  );
}

export default Filter;