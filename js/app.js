import { displayProducts }  from "./addProducts.js";
import {filterProducts, updateSportFilter,serachProducts} from "./filter.js";

document.addEventListener("DOMContentLoaded", () => {
  fetch(`http://localhost:3000/products`)
    .then(res => res.json())
    .then(products => {
      console.log("JSON завантажено:", products);
      displayProducts(products);     })
    .catch(error => console.log("Помилка з JSON:", error));
  fetch(`http://localhost:3000/sports`)
    .then(res => res.json())
    .then(sport => {
      console.log("JSON завантажено:", sport);
      updateSportFilter(sport);     })
    .catch(error => console.log("Помилка з JSON:", error));

  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleSidebar");

  // Відкриття/закриття sidebar
  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
      sidebar.classList.remove("open");
    }
  });

  //обробник для фільтрації товарів
  document.getElementById("sportFilter").addEventListener("change",(event) =>{
    filterProducts(event).then(filterProducts => {
      displayProducts(filterProducts);
    });
  });

  document.getElementById("searchInput").addEventListener("input", (event) => {
    serachProducts(event).then(searchProducts => {
      displayProducts(searchProducts);
    });
  });

});
