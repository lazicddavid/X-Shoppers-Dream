import { products } from "./product.js";

const DOM = {
  productsGrid: document.getElementById("productsGrid"),
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
};

const state = {
  search: "",
  category: "all",
  company: "all",
  freeShipping: false,
  maxPrice: Number(DOM.priceRange.max),
};

const productManager = {
  getFilteredProducts() {
    let result = [...products];

    if (state.category !== "all") {
      result = result.filter((product) => product.category === state.category);
    }

    if (state.company !== "all") {
      result = result.filter((product) => product.company === state.company);
    }

    if (state.freeShipping) {
      result = result.filter((product) => product.shipping === true);
    }

    result = result.filter((product) => product.price <= state.maxPrice);

    if (state.search) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(state.search)
      );
    }

    return result;
  },
};

function setCategories() {
  const categories = ["all"];

  products.forEach((product) => {
    let exists = false;

    for (let i = 0; i < categories.length; i++) {
      if (categories[i] === product.category) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      categories.push(product.category);
    }
  });

  DOM.categoryList.innerHTML = "";

  categories.forEach((category) => {
    const li = document.createElement("li");
    li.textContent = category;
    li.dataset.category = category;

    DOM.categoryList.appendChild(li);
  });
}

function setCompanies() {
  const companies = ["all"];

  products.forEach((product) => {
    let exists = false;

    for (let i = 0; i < companies.length; i++) {
      if (companies[i] === product.company) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      companies.push(product.company);
    }
  });

  DOM.companySelect.innerHTML = "";

  companies.forEach((company) => {
    const option = document.createElement("option");
    option.value = company;

    if (company === "all") {
      option.textContent = "All";
    }
    DOM.companySelect.appendChild(option);
  });
}

function showProducts() {
  const filteredProducts = productManager.getFilteredProducts();

  DOM.productsGrid.innerHTML = "";

  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" />
      <div class="product-info">
        <span class="product-name">${product.name}</span>
        <span class="product-price">$${product.price}</span>
      </div>
    `;

    DOM.productsGrid.appendChild(card);
  });
}

DOM.productsLink.addEventListener("click", (e) => {
  e.preventDefault();
  DOM.productsSection.classList.remove("hidden");
  DOM.filtersAside.classList.remove("hidden");

  setCategories();
  setCompanies();
  showProducts();
});

DOM.categoryList.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") return;

  state.category = e.target.dataset.category;
  showProducts();
});

DOM.companySelect.addEventListener("change", (e) => {
  state.company = e.target.value;
  showProducts();
});

DOM.priceRange.addEventListener("input", (e) => {
  state.maxPrice = Number(e.target.value);
  DOM.priceValue.textContent = `$${state.maxPrice.toFixed(2)}`;
  showProducts();
});

DOM.freeShippingCheckbox.addEventListener("change", (e) => {
  state.freeShipping = e.target.checked;
  showProducts();
});

DOM.searchInput.addEventListener("input", (e) => {
  state.search = e.target.value.toLowerCase();
  showProducts();
});

DOM.clearAllButton.addEventListener("click", () => {
  state.search = "";
  state.category = "all";
  state.company = "all";
  state.freeShipping = false;
  state.maxPrice = Number(DOM.priceRange.max);

  DOM.searchInput.value = "";
  DOM.companySelect.value = "all";
  DOM.freeShippingCheckbox.checked = false;
  DOM.priceRange.value = DOM.priceRange.max;
  DOM.priceValue.textContent = `$${state.maxPrice.toFixed(2)}`;

  showProducts();
});
