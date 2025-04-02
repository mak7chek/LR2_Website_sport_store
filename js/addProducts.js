import {addToCart} from "./cart.js";

export function displayProducts(products) {
  const gallery = document.querySelector(".product-gallery");
  gallery.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add("product-card");

    card.innerHTML = `
 <img src="${product.image}" alt = "${product.name}">
<h3>${product.name}</h3>
<p> Ціна: ${product.price} грн</p>
 <a href="product.html?id=${product.id}" class="details-button">Детальніше</a>
<button class="btn" data-id="${product.id}">Додавти в кошик</button> `;
    gallery.appendChild(card);
  });

  document.querySelector(".product-gallery").innerHTML
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      fetch(`http://localhost:3000/products/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Помилка при отриманні товару");
          return res.json();
        })
        .then(product => {
          addToCart(product);
        })
        .catch(error => console.error("Помилка:", error));
    });
  });
}


