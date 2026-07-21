'use strict';

/**
 * Add event on element(s)
 */
const addEventOnElem = function (elem, type, callback) {
  if (NodeList.prototype.isPrototypeOf(elem) || Array.isArray(elem)) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * Navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * Header & Back-to-top Button
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const showElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", showElemOnScroll);

/**
 * Product filter
 */
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const productList = document.querySelector(".product-list");
let currentFilter = "all";

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    filterBtns.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    currentFilter = this.dataset.filterBtn;
    filterProducts();
  });
});

function filterProducts() {
  const products = productList.querySelectorAll("li");

  products.forEach((product) => {
    const category = product.querySelector(".product-card").dataset.category;

    if (currentFilter === "all" || category === currentFilter) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

/**
 * Cart Logic Only (Wishlist removed)
 */
function getProductData(elem) {
  return {
    id: elem.dataset.id,
    name: elem.dataset.name,
    price: elem.dataset.price,
    image: elem.dataset.image,
    category: elem.dataset.category
  };
}

document.addEventListener('click', function (e) {
  const cartBtn = e.target.closest('.add-to-cart');

  if (cartBtn) {
    const card = e.target.closest('.product-card');
    const product = getProductData(card);
    const key = 'cart';

    let list = JSON.parse(localStorage.getItem(key)) || [];
    if (!list.find(item => item.id === product.id)) {
      list.push(product);
      localStorage.setItem(key, JSON.stringify(list));
      alert(`${product.name} added to your cart.`);
    } else {
      alert(`${product.name} is already in your cart.`);
    }
  }
});

/**
 * Load Products from products.json (if needed)
 */
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list");

  if (!productList) return;

  fetch('./assets/data/products.json')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const li = document.createElement("li");
        li.className = product.category;

        li.innerHTML = `
          <div class="product-card"
               data-id="${product.id}"
               data-name="${product.name}"
               data-price="${product.price}"
               data-image="${product.image}"
               data-category="${product.category}">

            <div class="card-banner img-holder has-before">
              <img src="${product.image}" alt="${product.name}" class="img-cover">
              <ul class="card-action-list">
                <li>
                  <button class="card-action-btn add-to-cart" title="Add to Cart">
                    <ion-icon name="bag-handle-outline"></ion-icon>
                  </button>
                </li>
              </ul>
            </div>

            <div class="card-content">
              <h3 class="h3 card-title">${product.name}</h3>
              <div class="card-price">
                <data value="${product.price}">₦${Number(product.price).toLocaleString()}</data>
              </div>
            </div>
          </div>
        `;

        productList.appendChild(li);
      });

      filterProducts(); // Trigger filtering after loading
    })
    .catch(err => {
      console.error("Failed to load products:", err);
    });
});


// Add to cart function
const product = {
  id: card.dataset.id,
  name: card.dataset.name,
  price: Number(card.dataset.price),
  image: card.dataset.image,
  category: card.dataset.category,
  quantity: 1
};

// ==== SIDE CART FUNCTIONALITY ====
const sideCart = document.getElementById("sideCart");
const sideCartOverlay = document.getElementById("sideCartOverlay");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const sideCartItems = document.getElementById("sideCartItems");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

function toggleCart(show) {
  sideCart.classList.toggle("active", show);
  sideCartOverlay.classList.toggle("active", show);
}

document.querySelector('[aria-label="Cart"]').addEventListener("click", () => toggleCart(true));
cartCloseBtn.addEventListener("click", () => toggleCart(false));
sideCartOverlay.addEventListener("click", () => toggleCart(false));

// Load cart on page load
function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  sideCartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += parseFloat(item.price);

    const li = document.createElement("li");
    li.className = "side-cart-item";

    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="side-cart-item-details">
        <p><strong>${item.name}</strong></p>
        <p>₦${Number(item.price).toLocaleString()}</p>
      </div>
    `;

    sideCartItems.appendChild(li);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toLocaleString();
}

// Update cart on Add to Cart click
document.addEventListener('click', function (e) {
  const cartBtn = e.target.closest('.add-to-cart');
  if (!cartBtn) return;

  const card = e.target.closest('.product-card');
  const product = {
    id: card.dataset.id,
    name: card.dataset.name,
    price: card.dataset.price,
    image: card.dataset.image,
    category: card.dataset.category
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.find(item => item.id === product.id)) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    toggleCart(true); // show cart on add
  } else {
    alert(`${product.name} is already in your cart.`);
  }
});

document.addEventListener("DOMContentLoaded", renderCartItems);

