function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function getProductById(productId) {
  try {
    const res = await fetch(`http://localhost:3000/products/${productId}`);
    if (!res.ok) throw new Error("Помилка при отриманні товару");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function displayProductDetails() {
  const productId = getProductIdFromURL();
  if (!productId) {
    document.getElementById("product-details").innerHTML = "<p>Товар не знайдено.</p>";
    return;
  }

  const product = await getProductById(productId);
  if (!product) {
    document.getElementById("product-details").innerHTML = "<p>Товар не знайдено.</p>";
    return;
  }

  document.getElementById("product-details").innerHTML = `
    <h1>${product.name}</h1>
    <img src="${product.image}" alt="${product.name}">
    <p><strong>Бренд:</strong> ${product.brand}</p>
    <p><strong>Ціна:</strong> ${product.price} грн</p>
    <p><strong>Опис:</strong> ${product.description || "Немає опису"}</p>
    <button class="add-to-cart" data-id="${product.id}">Додати в кошик</button>
  `;
}

document.addEventListener("DOMContentLoaded", displayProductDetails);
