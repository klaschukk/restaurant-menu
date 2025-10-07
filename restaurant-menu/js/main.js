document.addEventListener('DOMContentLoaded', () => {
    const menuItemsContainer = document.querySelector('.menu-items');

    // Fetch local JSON data
    fetch('../json/menu-data.json')
        .then(response => response.json())
        .then(data => {
            data.menuItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.classList.add('menu-item');
                menuItem.innerHTML = `
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <div class="item-details">
                            <span class="weight">${item.weight}</span>
                            <span class="price">${item.price}</span>
                        </div>
                        <a href="#" class="view-details" data-id="${item.name.toLowerCase().replace(/\s+/g, '-')}" >View Details</a>
                    </div>
                `;
                menuItemsContainer.appendChild(menuItem);
            });
        })
        .catch(error => console.error('Error loading menu data:', error));
});