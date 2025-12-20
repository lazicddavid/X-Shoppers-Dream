/*import { products } from "./product.js";

const productsGrid = document.getElementById("productsGrid");
const productsSection = document.getElementById("productsSection");
const productsLink = document.getElementById("productsLink");
const filtersAside = document.getElementById("filtersAside");

const categoryList = document.getElementById("categoryList");
const priceRange = document.querySelector(".price-range");
const priceValue = document.querySelector(".price-value");
const freeShippingCheckbox = document.querySelector(".free-shipping-checkbox");
const companySelect = document.querySelector(".company-select");
const clearAllButton = document.querySelector(".clear-filters-btn");
const searchInput = document.getElementById("searchInput");

let searchValue = "";
let selectedCompany = "all";
let freeShipping = false;
let maxPrice = Number(priceRange.max);

function filterProducts() {
  let filteredProducts = [...products];

  if (selectedCompany !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.company === selectedCompany
    );
  }

  if (freeShipping) {
    filteredProducts = filteredProducts.filter(
      (product) => product.shipping === true
    );
  }

  filteredProducts = filteredProducts.filter(
    (product) => product.price <= priceValue
  );

  if (searchValue !== "") {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchValue)
    );
  }

  showProducts(filteredProducts);
}

function showProducts(productsArray) {
  productsGrid.innerHTML = "";

  productsArray.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" />
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

  showProducts(products);
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

priceRange.addEventListener("input", () => {
  const maxPrice = Number(priceRange.value);

  priceValue.textContent = `$${maxPrice.toFixed(2)}`;

  const filteredByPrice = products.filter(
    (product) => product.price <= maxPrice
  );

  showProducts(filteredByPrice);
});

freeShippingCheckbox.addEventListener("change", () => {
  if (freeShippingCheckbox.checked) {
    const freeShippingProducts = products.filter(
      (product) => product.freeShipping === true
    );
    showProducts(freeShippingProducts);
  } else {
    showProducts(products);
  }
});

companySelect.addEventListener("change", () => {
  const selectedCompany = companySelect.value;
  if (selectedCompany === "all") {
    showProducts(products);
    return;
  }
  const filteredByCompany = products.filter(
    (product) => product.company === selectedCompany
  );

  showProducts(filteredByCompany);
});

clearAllButton.addEventListener("click", () => {
  selectedCompany = "all";
  freeShipping = false;
  searchValue = "";

  companySelect.value = "all";
  freeShippingCheckbox.checked = false;
  searchInput.value = "";

  priceRange.value = priceRange.max;
  maxPrice = Number(priceRange.max);
  priceValue.textContent = `$${maxPrice.toFixed(2)}`;

  filterProducts();
});
*/

//how to get unique values from an array
//get funkcije
