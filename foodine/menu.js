// Function to get menu items from localStorage
function getMenuItems() {
  const storedItems = localStorage.getItem("menuItems");
  return storedItems ? JSON.parse(storedItems) : [];
}

// Function to render the menu items on the menu.html page
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
          <button onclick="addToCart(${item.id})">Add To Cart</button>
        </div>
      </div>
    `;
    menuContainer.innerHTML += menuCard;
  });
}

// Function to get cart items from localStorage
function getCartItems() {
  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : [];
}

// Function to add an item to the cart
function addToCart(itemId) {
  const menuItems = getMenuItems();
  const cartItems = getCartItems();
  const itemToAdd = menuItems.find(item => item.id === itemId);

  if (itemToAdd) {
    cartItems.push(itemToAdd);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartCount();
    alert(`${itemToAdd.name} added to cart!`);
  } else {
    alert("Item not found!");
  }
}

// Function to update the cart count
function updateCartCount() {
  const cartItems = getCartItems();
  document.getElementById("cartCount").textContent = cartItems.length;
}

// Function to edit a menu item
function editMenuItem(itemId) {
  const menuItems = getMenuItems();
  const itemToEdit = menuItems.find(item => item.id === itemId);

  if (itemToEdit) {
    localStorage.setItem('itemToEdit', JSON.stringify(itemToEdit));  // Save the item to localStorage
    window.location.href = 'admin.html';  // Redirect to admin page for editing
  } else {
    alert("Item not found!");
  }
}

// Redirect to editcart.html when pencil icon is clicked
document.getElementById('editCart').addEventListener('click', function() {
  window.location.href = 'editcart.html'; // Redirect to editcart.html
});

// Initialize the menu rendering when the page loads
document.addEventListener("DOMContentLoaded", function () {
  renderMenuItems();
  updateCartCount();
});
