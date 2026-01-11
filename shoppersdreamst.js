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
  colorsContainer: document.querySelector(".colors-container"),
  sortSelect: document.getElementById("sort"),
  productsCount: document.getElementById("productsCount"),

  openFiltersBtn: document.getElementById("openFiltersBtn"),
  closeFiltersBtn: document.getElementById("closeFiltersBtn"),
};

const state = {
  search: "",
  category: "all",
  company: "all",
  freeShipping: false,
  color: "all",
  maxPrice: Number(DOM.priceRange.max),
  sort: "lowest",
};

const productManager = {
  getFilteredProducts() {
    let result = [...products];

    if (state.color !== "all") {
      result = result.filter((product) => product.colors.includes(state.color));
    }

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

    if (state.sort === "lowest") {
      result.sort((a, b) => a.price - b.price);
    }

    if (state.sort === "highest") {
      result.sort((a, b) => b.price - a.price);
    }

    if (state.sort === "a-z") {
      result.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }

    if (state.sort === "z-a") {
      result.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
    }

    return result;
  },
};

function getUniqueCategories() {
  const categories = [];

  products.forEach((product) => {
    categories.push(product.category);
  });

  const uniqueCategories = [...new Set(categories)];
  return ["all", ...uniqueCategories];
}

function setCompanies() {
  const companySet = new Set();

  products.forEach((product) => {
    companySet.add(product.company);
  });

  return ["all", ...companySet];
}

function renderCompanies() {
  const companies = setCompanies();

  DOM.companySelect.innerHTML = "";

  companies.forEach((company) => {
    const option = document.createElement("option");
    option.value = company;
    option.textContent = company;

    if (company === "all") {
      option.textContent = "All";
    }

    DOM.companySelect.appendChild(option);
  });
}
function setColors() {
  const colors = ["all"];

  products.forEach((product) => {
    product.colors.forEach((color) => {
      if (!colors.includes(color)) {
        colors.push(color);
      }
    });
  });

  return colors;
}

function renderColors() {
  const colors = setColors();
  DOM.colorsContainer.innerHTML = "";

  colors.forEach((color) => {
    const button = document.createElement("button");

    if (color === "all") {
      button.textContent = "All";
      button.classList.add("color-all");

      if (state.color === "all") {
        button.classList.add("active");
      }
    } else {
      button.classList.add("color-btn");
      button.style.backgroundColor = color;
    }

    button.dataset.color = color;
    DOM.colorsContainer.appendChild(button);
  });
}

function resetColors() {
  state.color = "all";

  const buttons = DOM.colorsContainer.querySelectorAll("button");
  buttons.forEach((btn) => btn.classList.remove("active"));

  const allBtn = DOM.colorsContainer.querySelector('[data-color="all"]');
  if (allBtn) allBtn.classList.add("active");
}

DOM.colorsContainer.addEventListener("click", (e) => {
  if (!e.target.dataset.color) return;

  state.color = e.target.dataset.color;

  const buttons = DOM.colorsContainer.querySelectorAll("button");
  buttons.forEach((btn) => btn.classList.remove("active"));

  e.target.classList.add("active");

  showProducts();
});

function showProducts() {
  const filteredProducts = productManager.getFilteredProducts();
  DOM.productsCount.textContent = `${filteredProducts.length} products found`;
  DOM.productsGrid.innerHTML = "";

  filteredProducts.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("product");

    article.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
      </div>
    `;

    DOM.productsGrid.appendChild(article);
  });
}

function displayCategories() {
  const categories = getUniqueCategories();
  DOM.categoryList.innerHTML = "";

  categories.forEach((category) => {
    const li = document.createElement("li");
    li.textContent = category.toUpperCase();
    li.dataset.category = category;

    if (category === "all") {
      li.classList.add("active");
    }

    DOM.categoryList.appendChild(li);
  });
}

DOM.productsLink.addEventListener("click", (e) => {
  e.preventDefault();
  DOM.productsSection.classList.remove("hidden");
  DOM.filtersAside.classList.remove("hidden");
  renderColors();
  displayCategories();
  renderCompanies();
  showProducts();
});

DOM.categoryList.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") return;

  const allCategories = DOM.categoryList.querySelectorAll("li");
  allCategories.forEach((li) => li.classList.remove("active"));

  e.target.classList.add("active");

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

DOM.sortSelect.addEventListener("change", (e) => {
  state.sort = e.target.value;
  showProducts();
});

DOM.openFiltersBtn.addEventListener("click", () => {
  DOM.filtersAside.classList.add("open");
});

DOM.closeFiltersBtn.addEventListener("click", () => {
  DOM.filtersAside.classList.remove("open");
});

function handleResize() {
  if (window.innerWidth <= 800) {
    DOM.filtersAside.classList.add("open");
  } else {
    DOM.filtersAside.classList.remove("open");
  }
}

// pokreni odmah
handleResize();

// slušaj resize
window.addEventListener("resize", handleResize);

DOM.clearAllButton.addEventListener("click", () => {
  state.search = "";
  state.category = "all";
  state.company = "all";
  state.freeShipping = false;
  state.maxPrice = Number(DOM.priceRange.max);
  state.color = "all";
  state.sort = "lowest";
  DOM.sortSelect.value = "lowest";
  DOM.searchInput.value = "";
  DOM.companySelect.value = "all";
  DOM.freeShippingCheckbox.checked = false;
  DOM.priceRange.value = DOM.priceRange.max;
  DOM.priceValue.textContent = `$${state.maxPrice.toFixed(2)}`;

  resetColors();
  showProducts();
});
