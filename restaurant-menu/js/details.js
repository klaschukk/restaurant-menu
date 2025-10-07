document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // id блюда из URL

    fetch('../json/menu-data.json')
        .then(response => response.json())
        .then(data => {
            const item = data.menuItems.find(i => i.name.toLowerCase().replace(/\s+/g, '-') === itemId);
            if (!item) return;

            document.getElementById('item-name').textContent = item.name;
            document.getElementById('item-image').src = item.image;
            document.getElementById('item-image').alt = item.name;
            document.getElementById('item-weight').textContent = `Вес: ${item.weight}`;
            document.getElementById('item-price').textContent = `Цена: ${item.price}`;
            document.getElementById('item-description').textContent = item.description;
        })
        .catch(error => console.error('Error loading menu data:', error));

    // Закрытие модалки по кресту
    const closeBtn = document.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        window.history.back(); // возвращаемся назад на меню
    });
});
