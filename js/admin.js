const productsAddForm = document.getElementById("productForm");
const adminGallery = document.getElementById("adminGallery");


function loadProducts() {
  fetch("http://localhost:3000/products")
    .then(res => {
      if (!res.ok) throw new Error("Помилка з серваком");
      return res.json();
    })
    .then(products_localhost => displayProducts(products_localhost))
    .catch(err => console.log("Помилка з серваком", err));
}

productsAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectSport=Array.from(document.querySelectorAll("#sport input:checked")).map(checkbox => checkbox.value);

  const newProduct= {
    id: Date.now().toString(),
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    sport_id: selectSport,
    price: document.getElementById("price").value,
    image: document.getElementById("imageUrl").value,

};
 fetch("http://localhost:3000/products", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(newProduct)
 })
   .then(res => {
     if (!res.ok) throw new Error("Помилка при додаванні товару");
     return res.json();
   })
   .then(() => {
     productsAddForm.reset();
     loadProducts();
   })
   .catch(err => console.log("Помилка при додаванні товару", err));
});

function displayProducts(products){
  adminGallery.innerHTML = "";
  products.forEach(product => {
    const productCards = document.createElement("div");
    productCards.classList.add("product-card");

    // language=HTML format=false
    productCards.innerHTML = `
    <img src="${product.image}">
    <h3>${product.name}</h3>
    <p>${product.brand}</p>
    <p>${product.price} грн </p>
    <button class = "edit-btn" data-id="${product.id}">Редагувати</button>
    <button class="delete-btn" data-id="${product.id}">Видалити</button>
    `;

    adminGallery.appendChild(productCards);

  });
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      deleteProduct(id);
    });
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      editProduct(id);
    });
  });
}


function deleteProduct(id) {
  console.log(`Видаляю товар з ID: ${id} (тип: ${typeof id})`);
  fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE"
  })
    .then(r => {
      if (!r.ok) {
        throw new Error("Помилка при видаленні");
      }
    })
    .then(() => loadProducts())
    .catch(err => console.log("Помилка при видаленні", err));
}
function editProduct(id) {
  fetch(`http://localhost:3000/products/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Помилка при отриманні товару");
      return res.json();
    })
    .then(product => {
      document.getElementById("name").value = product.name;
      document.getElementById("brand").value = product.brand;
      document.getElementById("price").value = product.price;
      document.getElementById("imageUrl").value = product.image;

      document.querySelectorAll("#sport input").forEach(input => {
        input.checked = product.sport_id.includes(input.value);
      });
      deleteProduct(id)
    })
    .catch(err => console.log("Помилка при отриманні товару", err));

}
loadProducts();
