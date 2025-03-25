import displelayProducts  from "./addProducts.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      console.log("JSON завантажено:", data);
      updateSportFilter(data.sports); // Оновлюємо список видів спорту
      displayProducts(data.products); // Відображаємо всі товари
    })
    .catch(error => console.log("Помилка з JSON:", error));

  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleSidebar");

  // Відкриття/закриття sidebar
  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Закриття sidebar при кліку поза ним
  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
      sidebar.classList.remove("open");
    }
  });

  // Додаємо обробник для фільтрації товарів
  document.getElementById("sportFilter").addEventListener("change", filterProducts);
});

// Оновлення фільтра видів спорту
function updateSportFilter(sports) {
  const sportFilter = document.getElementById("sportFilter");
  sportFilter.innerHTML = '<option value="all">Усі види спорту</option>';

  sports.forEach(sport => {
    let option = document.createElement("option");
    option.value = sport.id;
    option.textContent = sport.name;
    sportFilter.appendChild(option);
  });
}

// Фільтрація товарів
function filterProducts(event) {
  const sportId = event.target.value;

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const filteredProducts = sportId === "all"
        ? data.products
        : data.products.filter(product => product.sport_id === parseInt(sportId));

      displayProducts(filteredProducts);
    });
}

// Функція для відображення товарів
function displayProducts(products) {
  const gallery = document.querySelector(".product-gallery");
  gallery.innerHTML = ""; // Очищуємо попередній список

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} грн</p>
      <button class="btn">Додати в кошик</button>
    `;

    gallery.appendChild(card);
  });
}
