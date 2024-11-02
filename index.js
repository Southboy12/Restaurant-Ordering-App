import { menuArray } from "./data";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const menuEl = document.querySelector('#menus');
const preCheckout = document.querySelector('#pre-checkout');
const loginForm = document.querySelector('#login-form');
let orderList = [];

// Event listeners for click and submit events
document.addEventListener('click', handleDocumentClick);
document.addEventListener('submit', handlePaymentSubmit);

function handleDocumentClick(e) {
    if (e.target.dataset.key) {
        handleAddMenu(e.target.dataset.key);
    } else if (e.target.dataset.removeid) {
        handleRemoveOrder(e.target.dataset.removeid);
    }
}

// Add menu item to the order
function handleAddMenu(btnId) {
    const selectedObj = menuArray.find(menu => menu.id === Number(btnId));
    if (selectedObj) {
        orderList.push({
            name: selectedObj.name,
            price: selectedObj.price,
            id: selectedObj.id,
            uuid: uuidv4()
        });
    }
    updateOrderDisplay();
}

// Remove item from the order
function handleRemoveOrder(removeId) {
    orderList = orderList.filter(order => order.uuid !== removeId);
    updateOrderDisplay();
}

// Handle the payment form submission
function handlePaymentSubmit(e) {
    e.preventDefault();
    const paymentFormData = new FormData(loginForm);
    const name = paymentFormData.get("name");
    showThankYouMessage(name);
}

// Update the order display
function updateOrderDisplay() {
    const orderHtml = generateOrderHtml();
    const totalPrice = calculateTotalPrice();

    preCheckout.innerHTML = `
        <h3 class="checkout-title">Your order</h3>
        <div class="order-entry margin-container" id="order-item">
            ${orderHtml}
        </div>
        <div class="divider margin-container"></div>
        <div class="total-section order-item margin-container">
            <h3 class="total order-title">Total price:</h3>
            <p class="price">$${totalPrice}</p>
        </div>
        <button class="purchase-btn" id="purchase-btn">Complete order</button>
    `;

    preCheckout.style.visibility = 'visible';
    addPurchaseButtonListener();
}

// Generate HTML for each order item
function generateOrderHtml() {
    return orderList.map(order => `
        <div class="order-item">
            <h3 class="order-title">${order.name}</h3> 
            <button class="remove-btn" data-removeid="${order.uuid}">remove</button>
            <p class="price">$${order.price}</p>
        </div>
    `).join('');
}

// Calculate the total price of items in the order
function calculateTotalPrice() {
    return orderList.reduce((total, order) => total + order.price, 0);
}

// Add event listener to the purchase button
function addPurchaseButtonListener() {
    const purchaseBtn = document.querySelector('#purchase-btn');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', showPaymentModal);
    }
}

// Show the payment modal and disable add buttons
function showPaymentModal() {
    document.querySelectorAll('.add-btn').forEach(btn => btn.disabled = true);
    document.querySelector('#purchase-btn').disabled = true;
    document.querySelector('#payment-modal').style.display = 'block';
}

// Show a thank-you message after payment submission
function showThankYouMessage(name) {
    document.querySelector('#payment-modal').style.display = 'none';
    preCheckout.innerHTML = `<h3 class="thanks margin-container">Thanks, ${name}! Your order is on its way</h3>`;
}

// Generate the initial menu HTML
function getMenuHtml() {
    return menuArray.map(menu => `
        <div class="menu-details" data-key="${menu.id}">
            <p class="menu-emoji">${menu.emoji}</p>
            <div class="menu-info">
                <h3 class="menu-title">${menu.name}</h3>
                <p class="menu-description">${menu.ingredients}</p>
                <p class="price">$${menu.price}</p>
            </div>
            <button class="add-btn" data-key="${menu.id}">+</button>
        </div>
    `).join('');
}

// Render the menu and initial empty order display
function render() {
    menuEl.innerHTML = getMenuHtml();
    preCheckout.innerHTML = `
        <h3 class="checkout-title">Your order</h3>
        <div class="order-entry margin-container" id="order-item"></div>
        <div class="divider margin-container"></div>
        <div class="total-section order-item margin-container">
            <h3 class="total order-title">Total price:</h3>
            <p class="price">$0</p>
        </div>
        <button class="purchase-btn" id="purchase-btn" disabled>Complete order</button>
    `;
}

render();
