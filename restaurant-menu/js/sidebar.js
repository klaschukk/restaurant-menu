console.log("sidebar.js подключён");
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('close-btn');

  console.log(sidebar, menuToggle, closeBtn); // Проверим, находит ли элементы

  menuToggle.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("Нажали на меню!");
    sidebar.style.width = '250px';
  });

  closeBtn.addEventListener('click', () => {
    console.log("Нажали закрыть!");
    sidebar.style.width = '0';
  });
});