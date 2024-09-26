// Function to get the menu items from localStorage
function getMenuItems() {
  const storedItems = localStorage.getItem("menuItems");
  return storedItems ? JSON.parse(storedItems) : [];
}

// Function to render the menu items on the homepage (index.html)
function renderMenuItems() {
  const menuItems = getMenuItems();
  const menuContainer = document.querySelector('.cards');

  if (!menuContainer) {
    console.error("Menu container not found.");
    return;
  }

  menuContainer.innerHTML = ""; // Clear existing menu items

  // Loop through the menu items and create the card elements
  menuItems.forEach((item) => {
    const menuCard = `
      <div class="card">
        <img src="${item.image}" alt="${item.name}">
        <div class="card-details">
          <h5>${item.name}</h5>
          <p>₹${item.price}</p>
          <p>${item.description}</p>
          <button>Add To Cart</button>
        </div>
      </div>
    `;
    menuContainer.innerHTML += menuCard;
  });
}

// Initialize the menu rendering when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  renderMenuItems();
});
