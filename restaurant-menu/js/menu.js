document.addEventListener('DOMContentLoaded', () => {
    // Menu categories
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

    // Create menu category buttons
    const createCategoryButtons = () => {
        const categoryContainer = document.querySelector('.menu-categories');
        if (categoryContainer) {
            menuCategories.forEach(category => {
                const button = document.createElement('button');
                button.className = 'category-btn';
                button.textContent = category;
                button.addEventListener('click', () => loadMenuItems(category));
                categoryContainer.appendChild(button);
            });
        }
    };

    // Load menu items for selected category
    const loadMenuItems = (category) => {
        const menuContainer = document.querySelector('.menu-items');
        if (menuContainer) {
            // Clear current items
            menuContainer.innerHTML = '';
            
            // Fetch menu items (replace with actual API call or data source)
            fetch(`/api/menu/${category.toLowerCase()}`)
                .then(response => response.json())
                .then(items => {
                    items.forEach(item => {
                        const menuItem = createMenuItem(item);
                        menuContainer.appendChild(menuItem);
                    });
                })
                .catch(error => {
                    console.error('Error loading menu items:', error);
                });
        }
    };

    // Create menu item card
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
                    <span class="weight">${item.weight}g</span>
                    <span class="price">${item.price}€</span>
                </div>
                <a href="#" class="view-details" data-id="${item.id}">View Details</a>
            </div>
        `;

        // Add click handler for item details
        itemElement.querySelector('.view-details').addEventListener('click', (e) => {
            e.preventDefault();
            showItemDetails(item);
        });

        return itemElement;
    };

    // Show item details modal
    const showItemDetails = (item) => {
        const modal = document.createElement('div');
        modal.className = 'item-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p class="description">${item.description}</p>
                <div class="details">
                    <span class="weight">${item.weight}g</span>
                    <span class="price">${item.price}€</span>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    };

    // Initialize menu functionality
    const initMenu = () => {
        createCategoryButtons();
        // Load default category
        loadMenuItems(menuCategories[0]);
    };

    // Initialize when DOM is ready
    initMenu();
});