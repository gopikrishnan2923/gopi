// Function to get menu items from localStorage
function getMenuItems() {
  const storedItems = localStorage.getItem("menuItems");
  return storedItems ? JSON.parse(storedItems) : [];
}

// Function to save or update menu items
function saveMenuItem() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const isVeg = document.getElementById("isVeg").checked;
  const image = document.getElementById("image").value;

  if (!name || !description || !price || !image) {
    alert("Please fill all the fields.");
    return;
  }

  const menuItems = getMenuItems();
  const itemIndex = document.getElementById("itemIndex").value;

  const newItem = {
    id: itemIndex === "" ? (menuItems.length > 0 ? menuItems[menuItems.length - 1].id + 1 : 1) : menuItems[itemIndex].id,  // Assign or preserve id
    name,
    description,
    price: Number(price),
    isVeg,
    image
  };

  if (itemIndex === "") {
    // Add new item
    menuItems.push(newItem);
  } else {
    // Update existing item
    menuItems[Number(itemIndex)] = newItem;
  }

  localStorage.setItem("menuItems", JSON.stringify(menuItems));  // Save to localStorage
  renderAdminMenuItems();
  resetForm();
}

// Function to reset the form after adding or editing an item
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("isVeg").checked = false;
  document.getElementById("image").value = "";
  document.getElementById("itemIndex").value = "";
}

// Function to render the admin menu items for editing
function renderAdminMenuItems() {
  const menuItems = getMenuItems();
  const menuTable = document.getElementById("menuTable");
  menuTable.innerHTML = "";

  menuItems.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>${item.isVeg ? "Veg" : "Non-Veg"}</td>
        <td><button onclick="editMenuItem(${index})">Edit</button></td>
        <td><button onclick="deleteMenuItem(${index})">Delete</button></td>
      </tr>
    `;
    menuTable.innerHTML += row;
  });
}

// Function to edit a menu item
function editMenuItem(index) {
  const menuItems = getMenuItems();
  const item = menuItems[index];

  document.getElementById("name").value = item.name;
  document.getElementById("description").value = item.description;
  document.getElementById("price").value = item.price;
  document.getElementById("isVeg").checked = item.isVeg;
  document.getElementById("image").value = item.image;
  document.getElementById("itemIndex").value = index;
}

// Function to delete a menu item
function deleteMenuItem(index) {
  const menuItems = getMenuItems();
  menuItems.splice(index, 1);

  localStorage.setItem("menuItems", JSON.stringify(menuItems));
  renderAdminMenuItems();
}

// Check if an item is selected for editing from the menu page
document.addEventListener("DOMContentLoaded", function() {
  const itemToEdit = JSON.parse(localStorage.getItem('itemToEdit'));

  if (itemToEdit) {
    document.getElementById("name").value = itemToEdit.name;
    document.getElementById("description").value = itemToEdit.description;
    document.getElementById("price").value = itemToEdit.price;
    document.getElementById("isVeg").checked = itemToEdit.isVeg;
    document.getElementById("image").value = itemToEdit.image;
    document.getElementById("itemIndex").value = itemToEdit.id - 1;

    localStorage.removeItem('itemToEdit');
  }
});

// Call to render the admin menu when the page loads
document.addEventListener("DOMContentLoaded", renderAdminMenuItems);
