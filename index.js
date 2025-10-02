// selected category
let selectedCategory = "all";
function activeCategory(category) {
  selectedCategory = category;
  console.log(selectedCategory);
  fetchCategories(); // Refresh categories to update styles
  fetchTrees(); // Fetch and display trees based on new category
}

// fetch categories from API and display
async function fetchCategories() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/categories"
    );
    const data = await response.json();
    let categories = data.categories;

    const categoryList = document.getElementById("categoryList");
    // active and inactive button styles
    let activeButtonStyle =
      "text-white pl-2 py-1 w-[200px] text-start rounded text-sm bg-green-700 cursor-pointer";
    let inactiveButtonStyle =
      "text-green-700 pl-2 py-1 w-[200px] text-start rounded text-sm cursor-pointer hover:bg-green-100 transition-colors";

    categoryList.innerHTML = ""; // Clear existing
    categoryList.innerHTML += `
        <button
         onclick="activeCategory('all')"
        class= "${
          selectedCategory === "all" ? activeButtonStyle : inactiveButtonStyle
        }">
          ${"All Tree"}
        </button>`;

    categories.forEach((category) => {
      categoryList.innerHTML += `
        <button
        onclick="activeCategory('${category.category_name}')"
        class="${
          selectedCategory == category.category_name
            ? activeButtonStyle
            : inactiveButtonStyle
        }">
          ${category.category_name}
        </button>
      `;
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

fetchCategories();

// After fetching plants, filter and display them
async function fetchTrees() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/plants"
    );
    const data = await response.json();
    let trees = data.plants;

    // Filter trees by selectedCategory
    let filteredTrees =
      selectedCategory === "all"
        ? trees
        : trees.filter((tree) => tree.category === selectedCategory);

    // Render trees (example)
    const treeList = document.getElementById("productList");
    productList.innerHTML = "";
    filteredTrees.forEach((tree) => {
      productList.innerHTML += `
          <div
            class="product bg-white p-3 rounded shadow-sm mb-4 md:max-w-[235px] sm:w-full"
          >
            <div class="">
              <img class="h-50 w-full object-cover" src="${tree.image}" alt="" />
            </div>
            <h4 class="font-semibold mt-2">${tree.name}</h4>
            <h6 class="text-gray-700 mb-2">${tree.description}</h6>
            <div class="flex justify-between items-center my-2">
              <div
                class="text-sm bg-green-100 text-green-700 rounded-full px-2 py-1"
              >${tree.category}</div>
              <div class="price">
                <span><i class="fa-solid fa-bangladeshi-taka-sign"></i></span
                >${tree.price}</div>
            </div>
            <button
              class="bg-green-700 text-white w-full px-5 py-2 rounded-full text-sm hover:bg-green-800 transition-colors mt-2"
            >
              Add to Cart
            </button>
          </div>
      `;
    });
  } catch (error) {
    console.error("Error fetching trees:", error);
  }
}

fetchTrees();
