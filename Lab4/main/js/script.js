document.addEventListener('DOMContentLoaded', function() {
    const loadUsersBtn = document.getElementById('loadUsers');
    const clearUsersBtn = document.getElementById('clearUsers');
    const usersContainer = document.getElementById('usersContainer');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    // Функция для получения данных из API
    async function fetchUsers(count = 6) {
        try {
            // Показываем индикатор загрузки
            loadingElement.style.display = 'flex';
            errorElement.style.display = 'none';
            
            // Выполняем запрос к API
            const response = await fetch(`https://randomuser.me/api/?results=${count}`);
            
            // Проверяем успешность запроса
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            
            // Парсим JSON ответ
            const data = await response.json();
            
            // Скрываем индикатор загрузки
            loadingElement.style.display = 'none';
            
            return data.results;
        } catch (error) {
            // Обрабатываем ошибки
            console.error('Ошибка при загрузке данных:', error);
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            return [];
        }
    }
    
    // Функция для создания карточки пользователя
    function createUserCard(user) {
        const card = document.createElement('div');
        card.className = 'user-card';
        
        card.innerHTML = `
            <div class="user-image-container">
                <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}" class="user-image">
            </div>
            <div class="user-info">
                <h2 class="user-name">${user.name.title} ${user.name.first} ${user.name.last}</h2>
                <p class="user-details"><i class="fas fa-envelope"></i> ${user.email}</p>
                <p class="user-details"><i class="fas fa-phone"></i> ${user.phone}</p>
                <p class="user-details"><i class="fas fa-map-marker-alt"></i> ${user.location.city}, ${user.location.country}</p>
                <p class="user-details"><i class="fas fa-birthday-cake"></i> ${user.dob.age} лет</p>
            </div>
        `;
        
        return card;
    }
    
    // Функция для отображения пользователей
    function displayUsers(users) {
        if (users.length === 0) {
            usersContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>Нет данных для отображения</h3>
                    <p>Нажмите кнопку "Загрузить пользователей", чтобы получить данные</p>
                </div>
            `;
            return;
        }
        
        usersContainer.innerHTML = '';
        users.forEach(user => {
            const userCard = createUserCard(user);
            usersContainer.appendChild(userCard);
        });
    }
    
    // Обработчик для кнопки загрузки пользователей
    loadUsersBtn.addEventListener('click', async function() {
        // Блокируем кнопку на время загрузки
        loadUsersBtn.disabled = true;
        loadUsersBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
        
        const users = await fetchUsers(6);
        
        if (users.length > 0) {
            displayUsers(users);
        } else {
            usersContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Не удалось загрузить данные</h3>
                    <p>Попробуйте еще раз или проверьте подключение к интернету</p>
                </div>
            `;
        }
        
        // Разблокируем кнопку
        loadUsersBtn.disabled = false;
        loadUsersBtn.innerHTML = '<i class="fas fa-users"></i> Загрузить пользователей';
    });
    
    // Обработчик для кнопки очистки
    clearUsersBtn.addEventListener('click', function() {
        displayUsers([]);
    });
    
    // Показываем начальное состояние
    displayUsers([]);
});