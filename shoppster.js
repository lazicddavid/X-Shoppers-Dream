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
