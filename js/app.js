import { displayProducts }  from "./addProducts.js";
import { updateSportFilter , filterProducts }  from "./filter.js";

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
  document.getElementById("sportFilter").addEventListener("change",(event) =>{
    displayProducts( filterProducts(event));
  });
});
