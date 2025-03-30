const productForm = document.getElementById("productForm");
const adminGallery = document.getElementById("adminGallery");

let products = JSON.parse(localStorage.getItem("products")) || [];

// 📌 Завантаження товарів
function loadProducts() {
  displayProducts(products);
}

// 📌 Додавання нового товару
productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newProduct = {
    id: Date.now(),
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    price: parseFloat(document.getElementById("price").value),
    sport_id: document.getElementById("sport").value,
    image: document.getElementById("imageUrl").value
  };

  products.push(newProduct);
  saveProducts();
  displayProducts(products);
  productForm.reset();
});

// 📌 Відображення товарів
function displayProducts(products) {
  adminGallery.innerHTML = "";
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.brand}</p>
            <p>${product.price} грн</p>
            <button class="edit-btn" data-id="${product.id}">Редагувати</button>
            <button class="delete-btn" data-id="${product.id}">Видалити</button>
        `;
    adminGallery.appendChild(productCard);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
      const id = parseInt(event.target.dataset.id);
      deleteProduct(id);
    });
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
      const id = parseInt(event.target.dataset.id);
      editProduct(id);
    });
  });
}

// 📌 Видалення товару
function deleteProduct(id) {
  products = products.filter(product => product.id !== id);
  saveProducts();
  displayProducts(products);
}

// 📌 Редагування товару
function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  document.getElementById("name").value = product.name;
  document.getElementById("brand").value = product.brand;
  document.getElementById("price").value = product.price;
  document.getElementById("sport").value = product.sport_id;
  document.getElementById("imageUrl").value = product.image;

  deleteProduct(id);
}

// 📌 Збереження в `localStorage`
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// 🔥 Завантажуємо товари при відкритті сторінки
loadProducts();
