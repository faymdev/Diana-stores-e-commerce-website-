'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const cartDrawer = document.getElementById("cart-drawer");
  const toggleCartBtn = document.getElementById("toggle-cart");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const cartItemCount = document.getElementById("cart-item-count");

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Open/Close Cart Drawer
  toggleCartBtn.addEventListener("click", () => {
    cartDrawer.classList.add("open");
  });

  closeCartBtn.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
  });

  // Render Cart Items
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cartCount.textContent = cart.length;
    cartItemCount.textContent = cart.length;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="section-text">Your cart is empty.</p>`;
      cartTotal.textContent = "0";
      return;
    }

    cart.forEach((item, index) => {
      const subtotal = item.quantity * item.price;
      total += subtotal;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <div class="item-img">
          <img src="${item.image}" alt="${item.name}" class="img-cover">
        </div>
        <div class="item-details">
          <h4>${item.name}</h4>
          <p class="category">${item.category}</p>
          <p class="price">₦${Number(item.price).toLocaleString()}</p>
          <div class="quantity-controls">
            <button class="qty-btn minus" data-index="${index}">−</button>
            <span class="qty">${item.quantity}</span>
            <button class="qty-btn plus" data-index="${index}">+</button>
          </div>
        </div>
        <button class="delete-btn" data-index="${index}">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      `;
      cartItemsContainer.appendChild(itemEl);
    });

    cartTotal.textContent = Number(total).toLocaleString();
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Handle quantity +/− and delete
  cartItemsContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("plus")) {
      cart[index].quantity++;
    } else if (e.target.classList.contains("minus")) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
    } else if (e.target.closest(".delete-btn")) {
      cart.splice(index, 1);
    }

    renderCart();
  });

  renderCart();
});
