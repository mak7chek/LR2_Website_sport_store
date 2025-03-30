
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
  const sportId = parseInt(event.target.value);

  return fetch("data.json")
    .then(res => res.json())
    .then(data => {
      let filteredProducts;

      if (event.target.value === "all") {
        filteredProducts = data.products;
      } else {
        filteredProducts = data.products.filter(product =>
          Array.isArray(product.sport_id)
            ? product.sport_id.includes(sportId)
            : product.sport_id === sportId
        );
      }

      return filteredProducts;
    });
}

export function serachProducts(event) {
  const input = event.target.value.trim().toLowerCase();

  return fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const filterProducts = data.products.filter(product =>  product.name.toLowerCase().includes(input) || product.brand.toLowerCase().includes(input) );

    if (filterProducts.length === 0) {
      document.querySelector(".product-gallery").innerHTML = "<p>Нічого не знайдено</p>";
      return LOX // тут взагалі прикол, але за то робить
    }
    else return filterProducts;

  });
}
