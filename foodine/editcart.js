// Function to get cart items from localStorage
function getCartItems() {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
}

// Function to render cart items in the table
function renderCartItems() {
    const cartItems = getCartItems();
    const cartTableBody = document.querySelector("#cartTable tbody");
    cartTableBody.innerHTML = ""; // Clear the table body

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * (item.quantity || 1);
        totalPrice += itemTotal;

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>
                    <input type="number" value="${item.quantity || 1}" min="1" class="quantity-input" data-index="${index}" onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>₹${itemTotal}</td>
                <td class="cart-actions">
                    <button onclick="removeFromCart(${index})">Remove</button>
                </td>
            </tr>
        `;
        cartTableBody.innerHTML += row;
    });

    document.getElementById("totalPrice").textContent = totalPrice;
}

// Function to update the quantity of a cart item
function updateQuantity(index, newQuantity) {
    const cartItems = getCartItems();
    cartItems[index].quantity = parseInt(newQuantity);  // Update quantity in the cart
    localStorage.setItem("cartItems", JSON.stringify(cartItems));  // Save the updated cart
    renderCartItems();  // Re-render the cart
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const cartItems = getCartItems();
    cartItems.splice(index, 1);  // Remove the item from the array
    localStorage.setItem("cartItems", JSON.stringify(cartItems));  // Save the updated cart
    renderCartItems();  // Re-render the cart
}

// Function to handle "Order Now" button click
function handleOrderNow() {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Save the order details (if needed) and redirect to payment page
    saveOrderDetails(cartItems);
    window.location.href = 'payment.html';  // Redirect to payment page
}


// Function to save order details to localStorage
function saveOrderDetails(orderItems) {
    let orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];
    orders.push(orderItems);  // Add new order to the existing orders
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Order has been placed!");
    localStorage.removeItem("cartItems");  // Clear the cart after placing order
    window.location.href = "index.html";  // Redirect after placing the order
}

// Initialize the cart rendering when the page loads
document.addEventListener("DOMContentLoaded", function () {
    renderCartItems();

    // Add event listener to "Order Now" button
    const orderNowBtn = document.querySelector(".order-now-btn");
    orderNowBtn.addEventListener("click", handleOrderNow);
});
