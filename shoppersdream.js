import { products } from "./product.js";

const productsGrid = document.getElementById("productsGrid");
const productsSection = document.getElementById("productsSection");
const productsLink = document.getElementById("productsLink");
const filtersAside = document.getElementById("filtersAside");

const categoryList = document.getElementById("categoryList");

function showProducts(productsArray) {
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
  filtersAside.classList.remove("hidden");

  showProducts();
});

categoryList.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") return;

  const category = e.target.dataset.category;

  if (category === "all") {
    showProducts(products);
    return;
  }

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  showProducts(filteredProducts);
});

//how to get unique values from an array
