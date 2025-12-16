import { products } from "./product.js";
import { products } from "./product.js";

const productsGrid = document.getElementById("productsGrid");
const productsSection = document.getElementById("productsSection");
const productsLink = document.getElementById("productsLink");

function showProducts() {
  productsGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <span class="product-name">${product.name}</span>
        <span class="product-price">$${product.price}</span>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

productsLink.addEventListener("click", (e) => {
  e.preventDefault();
  productsSection.classList.remove("hidden");
  showProducts();
});

//how to get unique values from an array
