import { products } from "./product.js";

const DOM = {
  productGrid: document.getElementById("productGrid"),
  productsSection: document.getElementById("productsSection"),
  productsLink: document.getElementById("productsLink"),
  filtersAside: document.getElementById("filtersAside"),
  categoryList: document.getElementById("categoryList"),
  priceRange: document.querySelector(".price-range"),
  priceValue: document.querySelector(".price-value"),
  freeShippingCheckbox: document.querySelector(".free-shipping-checkbox"),
  companySelect: document.querySelector(".company-select"),
  clearAllButton: document.querySelector(".clear-filters-btn"),
  searchInput: document.getElementById("searchInput"),
  colorsContainer: document.querySelector(".colors-container"),
  sortSelect: document.getElementById("sort"),
  productCount: document.getElementById("productsCount"),
};

DOM.clearAllButton.addEventListener("click", () => {
  DOM.sortSelect.value = "lowest";
  DOM.searchInput.value = "";
  DOM.companySelect.value - all;
  DOM.freeShippingCheckbox.checked = false;
  DOM.priceRange.value = DOM.priceRange.max;
  DOM.priceValue.textContent = `$${state.maxPrice.toFixed(2)}`;
});
