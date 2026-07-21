// Global product data
const products = [
  {
    id: 1,
    name: "Full apartment transformation",
    price: 4500000,
    image: "assets/images/before3.jpg"

  },
  {
    id: 2,
    name: "waiting room full transformation",
    price: 1500000,
    image: "assets/images/before 2.jpg",
  },
  {
    id: 3,
    name: "Kitchen full transformation",
    price: 2000000,
    image: "assets/images/before4.jpg",
  },
  {
    id: 4,
    name: "Full bedroom transformation",
    price: 9800,
    image: "assets/images/before 1.jpg",
  },
  {
    id: 5,
    name: "full Living room decoration",
    price: 3500000,
    image: "assets/images/istockphoto-2184806120-612x612 (1).webp",
  },{
    id: 6,
    name: "Full dinning set",
    price: 1500000,
    image: "assets/images/chairs-2181960_1280.jpg",
  },{
    id: 7,
    name: "full Living room decoration",
    price: 3500000,
    image: "assets/images/blog-2.jpg",
  },{
    id: 8,
    name: "wooden fragrance dispencer",
    price: 8000,
    image: "assets/images/about-banner.jpg",
  },{
    id: 9,
    name: "fancy cusion seats",
    price: 15000,
    image: "assets/images/hero-product-2.jpg",
  },{
    id: 10,
    name: "ceramic vases set",
    price: 15000,
    image: "assets/images/Ceramic Vases Set.jpg",
  },{
    id: 11,
    name: "fancy mirror",
    price: 15000,
    image: "assets/images/fancy irror 2.jpg",
  },{
    id: 12,
    name: "fancy mirror",
    price: 15000,
    image: "assets/images/fancy mirro 3.jpg",
  },{
    id: 13,
    name: "fancy mirror",
    price: 15000,
    image: "assets/images/fancy mirror.jpg",
  },{
    id: 14,
    name: "Wooden Flowers vasesn",
    price: 7000,
    image: "assets/images/product-2.jpg",
  },{
    id: 15,
    name: "ceramic Flowers vase",
    price: 25000,
    image: "assets/images/hero-product-3.jpg",
  },{
    id: 16,
    name: "Wooden egg creats",
    price: 5000,
    image: "assets/images/hero-product-4.jpg",
  },{
    id: 17,
    name: "Luxury wooden shelf",
    price: 50000,
    image: "assets/images/product-13.jpg",
  },{
    id: 18,
    name: "lilly flowers",
    price: 5000,
    image: "assets/images/product-1.jpg",
  },{
    id: 19,
    name: "Luxury cactus vase",
    price: 1000,
    image: "assets/images/product-3.jpg",
  },{
    id: 20,
    name: "green ceramic water jug",
    price: 15000,
    image: "assets/images/product-4.jpg",
  },{
    id: 21,
    name: "wooden spatula and bowl",
    price: 3000,
    image: "assets/images/product-5.jpg",
  },{
    id: 22,
    name: "CTransparent glass jug",
    price: 4000,
    image: "assets/images/product-7.jpgg",
  },{
    id: 23,
    name: "fancy led lamp",
    price: 4000,
    image: "assets/images/product-8.jpg",
  },{
    id: 24,
    name: "fancy Wooden chair",
    price: 25000,
    image: "assets/images/product-9.jpg",
  },{
    id: 25,
    name: "Cluxury relaxing chair",
    price: 25000,
    image: "assets/images/product-9.jpg",
  },{
    id: 26,
    name: "fancy chair,shelf and flower vase combo",
    price: 75000,
    image: "assets/images/room-1336497_1280.jpg",
  },{
    id: 27,
    name: "fancy bowl mixer",
    price: 3000,
    image: "assets/images/product-19.jpg",
  },{
    id: 28,
    name: "wooden ingredent compartment",
    price: 11000,
    image: "assets/images/product-18.jpg",
  },{
    id: 29,
    name: "Chef’s wooden saucer",
    price: 1000,
    image: "assets/images/product-11.jpg",
  }
];

// When DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");

  // Render products on shop page
  if (productList) {
    productList.innerHTML = products.map(product => `
      <li class="product-card">
        <div class="card-banner img-holder">
          <img src="${product.image}" alt="${product.name}" class="img-cover" width="300" height="300">
        </div>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-price">₦${product.price.toLocaleString()}</p>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </li>
    `).join("");

    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
      button.addEventListener("click", () => {
        const id = parseInt(button.dataset.id);
        addToCart(id);
      });
    });
  }

  // Render cart page items
  if (document.getElementById("cart-items")) {
    displayCartItems();
  }

  // Render checkout page summary
  if (document.getElementById("checkout-summary")) {
    displayCheckoutSummary();
  }
});

// Add to cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems(); // Refresh cart
}

// Display cart items
function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("cart-subtotal");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    if (subtotalElement) subtotalElement.textContent = "0";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    return `
      <div class="side-cart-item">
        <img src="${item.image}" alt="${item.name}" width="80">
        <div class="side-cart-item-details">
          <h4>${item.name}</h4>
          <p>₦${item.price.toLocaleString()} × ${item.quantity}</p>
          <p><strong>Total: ₦${itemTotal.toLocaleString()}</strong></p>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  if (subtotalElement) subtotalElement.textContent = total.toLocaleString();

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = parseInt(button.dataset.id);
      removeFromCart(id);
    });
  });
}

// Display checkout summary
function displayCheckoutSummary() {
  const summaryContainer = document.getElementById("checkout-summary");
  const totalElement = document.getElementById("checkout-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    summaryContainer.innerHTML = "<p>No items in cart.</p>";
    totalElement.textContent = "0";
    return;
  }

  let total = 0;
  summaryContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `<p>${item.name} × ${item.quantity} — ₦${itemTotal.toLocaleString()}</p>`;
  }).join("");

  totalElement.textContent = total.toLocaleString();
}

// Optional: handle checkout form submission
function handleCheckout(event) {
  event.preventDefault();
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}
