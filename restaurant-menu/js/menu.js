document.addEventListener('DOMContentLoaded', () => {
    // Категории меню
    const menuCategories = [
        'Breakfast',
        'Top Offers',
        'Main Dishes',
        'Pasta & Risotto',
        'Pizza',
        'Soups',
        'Salads',
        'Side Dishes',
        'Desserts',
        'Beverages',
        'Wine List',
        'Cocktails',
        'Beer'
    ];

    // Создание кнопок категорий
    const createCategoryButtons = () => {
        const categoryContainer = document.querySelector('.menu-categories');
        if (categoryContainer) {
            categoryContainer.innerHTML = ''; // очищаем перед рендером
            menuCategories.forEach(category => {
                const button = document.createElement('button');
                button.className = 'category-btn';
                button.textContent = category;
                button.addEventListener('click', () => loadMenuItems(category));
                categoryContainer.appendChild(button);
            });
        }
    };

    // Загрузка блюд по категории
    const loadMenuItems = (category) => {
        const menuContainer = document.querySelector('.menu-items');
        if (!menuContainer) return;

        menuContainer.innerHTML = '<p>Loading...</p>';

        // Загружаем данные из локального JSON
        fetch('../json/menu-data.json')
            .then(response => {
                if (!response.ok) throw new Error('Ошибка загрузки данных');
                return response.json();
            })
            .then(data => {
                // Фильтруем блюда по категории
                const items = data.menuItems.filter(
                    item => item.category.toLowerCase() === category.toLowerCase()
                );

                menuContainer.innerHTML = ''; // очищаем контейнер

                if (items.length === 0) {
                    menuContainer.innerHTML = `<p>No items found for ${category}.</p>`;
                    return;
                }

                // Добавляем карточки
                items.forEach(item => {
                    const menuItem = createMenuItem(item);
                    menuContainer.appendChild(menuItem);
                });
            })
            .catch(error => {
                console.error('Error loading menu items:', error);
                menuContainer.innerHTML = `<p>Error loading menu for ${category}.</p>`;
            });
    };

    // Создание карточки блюда
    const createMenuItem = (item) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <div class="item-details">
                    <span class="weight">${item.weight}</span>
                    <span class="price">${item.price}</span>
                </div>
                <a href="#" class="view-details">View Details</a>
            </div>
        `;

        // Обработчик "View Details"
        itemElement.querySelector('.view-details').addEventListener('click', (e) => {
            e.preventDefault();
            showItemDetails(item);
        });

        return itemElement;
    };

    // Модальное окно с описанием блюда
    const showItemDetails = (item) => {
        const modal = document.createElement('div');
        modal.className = 'item-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <div class="details">
                    <span>${item.weight}</span>
                    <span>${item.price}</span>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    };

    // Инициализация
    const initMenu = () => {
        createCategoryButtons();
        loadMenuItems('Breakfast'); // категория по умолчанию
    };

    initMenu();
});
