let cart = [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (error) {
            console.error("Помилка розбору кошика з LocalStorage:", error);
            cart = [];
        }
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>Ціна: ${item.price} грн</p>
      </div>
      <div class="quantity-controls">
        <button class="decrease" data-index="${index}">–</button>
        <span>${item.quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
    `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateTotalPrice();
    saveCart();
}

function updateTotalPrice() {
    const totalPriceEl = document.getElementById('totalPrice');
    if (!totalPriceEl) return;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceEl.textContent = total.toFixed(2);
}

function changeQuantity(index, delta) {
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity < 1) {
            cart.splice(index, 1);
        }
        displayCartItems();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    if (document.getElementById('cartItems')) {
        displayCartItems();

        document.getElementById('cartItems').addEventListener('click', (e) => {
            if (e.target.classList.contains('increase')) {
                const index = parseInt(e.target.dataset.index);
                changeQuantity(index, 1);
            }
            if (e.target.classList.contains('decrease')) {
                const index = parseInt(e.target.dataset.index);
                changeQuantity(index, -1);
            }
        });
    }
});

export function addToCart(product) {
    console.log(product);
    const productPrice = Number(product.price);
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, price: productPrice, quantity: 1 });
    }
    displayCartItems();
    saveCart()
}
