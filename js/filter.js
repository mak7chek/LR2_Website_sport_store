document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      updateSportFilter(data.sports); // Додаємо список видів спорту
      displayProducts(data.products); // Відображаємо всі товари
    })
    .catch(error => console.log("Помилка з JSON:", error));

  // Логіка відкривання/закривання панелі
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleSidebar");

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
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
        : data.products.filter(product => product.sport_id.includes(parseInt(sportId)));

      displayProducts(filteredProducts);
    });
}

document.getElementById("sportFilter").addEventListener("change", filterProducts);
