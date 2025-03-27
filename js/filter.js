
export function updateSportFilter(sports) {
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
export function filterProducts(event) {
  const sportId = event.target.value;

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      let filteredProducts
        if (sportId === "all") {
          filteredProducts = data.products;
        }else {
          filteredProducts = data.products.filter(product => {product.suport_id === parseInt(sportId)});
        }
        return filteredProducts;
    });
}

