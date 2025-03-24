document.addEventListener("DOMContentLoaded", () =>{
  fetch("data.json")
    .then(response => response.json()) //тіпа обєкт створили
    .then(data => {
      console.log(data.products);
      console.log(data);
      displayProducts(data.products);
    })
    .catch(error => console.log("Помилка з товарами JSON:", error));
});

function displayProducts(products){
  const gallery = document.querySelector(".product-gallery");
  gallery.innerHTML = "";
  products.forEach(product => {
    const card=document.createElement('div');
    card.classList.add("product-card");

    card.innerHTML =`
 <img src="${product.image}" alt = "${product.name}">
<h3>${product.name}</h3>
<p> Ціна: ${product.price} грн</p>
<button class="btn">Додавти в кошик</button> `;
    gallery.appendChild(card);
  });
}



