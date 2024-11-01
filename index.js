import { menuArray  } from "./data";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'


const menuEl = document.querySelector('#menus')
const preCheckout = document.querySelector('#pre-checkout')
const loginForm = document.querySelector('#login-form')



document.addEventListener('click', function(e) {
    if (e.target.dataset.key) {
        handleAddMenu(e.target.dataset.key)
    }
    else if (e.target.dataset.removeid) {
        handleRemoveOrder(e.target.dataset.removeid);
        
    }    
})

document.addEventListener('submit', handlePaymentSubmit)

let orderList = []

function handleAddMenu(btnId) {

    const selectedObj = menuArray.filter(function(menu) {
        return menu.id === Number(btnId)
    })[0]
    
    orderList.push({
        name: selectedObj.name,
        price: selectedObj.price,
        id: selectedObj.id,
        uuid: uuidv4()
    })    

    const orderHtml = orderList.map(order => {
        return `
        <div class="order-item">
            <h3 class="order-title">${order.name}</h3> 
            <button class="remove-btn" data-removeid="${order.uuid}">remove</button>
            <p class="price">$${order.price}</p>
        </div>
        `        
    }).join('')


    preCheckout.innerHTML = `
        <h3 class="checkout-title">Your order</h3>
        <div class="order-entry margin-container" id="order-item">
            ${orderHtml}
        </div>
    
        <div class="divider margin-container"></div>
        <div class="total-section order-item margin-container">
            <h3 class="total order-title">Total price:</h3>
            <p class="price">$${orderList.reduce((total, order) => total + order.price, 0) }</p>
        </div>
        <button class="purchase-btn" id="purchase-btn">Complete order</button>
    `
    preCheckout.style.visibility = 'visible'

    const addBtns = document.querySelectorAll('.add-btn')

    document.querySelector('#purchase-btn').addEventListener('click', function() {
        addBtns.forEach(addBtn => {
            addBtn.disabled = true
        });
        document.querySelector('#purchase-btn').disabled = true
        document.querySelector('#payment-modal').style.display = 'block'
        
    })
}

function handlePaymentSubmit(e) {
    e.preventDefault()

    const paymentFormData = new FormData(loginForm)

    const name = paymentFormData.get("name")

    document.querySelector('#payment-modal').style.display = 'none'
    preCheckout.innerHTML = `<h3 class="thanks margin-container">Thanks, ${name}! Your order is on its way</h3>`

}

function handleRemoveOrder(removeId) {
    orderList = orderList.filter(order => order.uuid !== removeId)
    updateOrderDisplay()
}


function updateOrderDisplay() {
    
    const orderHtml = orderList.map(popOrder => {
        return `
            <div class="order-item">
                <h3 class="order-title">${popOrder.name}</h3> 
                <button class="remove-btn" data-removeid="${popOrder.uuid}">remove</button>
                <p class="price">$${popOrder.price}</p>
            </div>
        `       
        }).join('')        

        requestAnimationFrame(() => {
            preCheckout.innerHTML = `
                <h3 class="checkout-title">Your order</h3>
                <div class="order-entry margin-container" id="order-item">
                    ${orderHtml}
                </div>

                <div class="divider margin-container"></div>
                <div class="total-section order-item margin-container">
                    <h3 class="total order-title">Total price:</h3>
                    <p class="price">$${orderList.reduce((total, poporder) => total + poporder.price, 0) }</p>
                </div>
                <button class="purchase-btn" id="purchase-btn">Completed order</button>
            `;
            const purchaseBtn = document.querySelector('#purchase-btn');
            if (purchaseBtn) {
                purchaseBtn.addEventListener('click', function() {
                    document.querySelectorAll('.add-btn').forEach(btn => btn.disabled = true);
                    purchaseBtn.disabled = true;
                    document.querySelector('#payment-modal').style.display = 'block';
                });
            }
        })
}

function getMenuHtml() {
    
    const allMenu = menuArray.map(menu => {
        return `
            <div class="menu-details" data-key="${menu.id}">
                <p class="menu-emoji">${menu.emoji}</p>
                <div class="menu-info">
                    <h3 class="menu-title">${menu.name}</h3>
                    <p class="menu-description">${menu.ingredients}</p>
                    <p class="price">$${menu.price}</p>
                </div>
                <button class="add-btn" data-key="${menu.id}">+</button>
            </div>
        `
    }).join('')

    preCheckout.innerHTML = `
        <h3 class="checkout-title">Your order</h3>
        <div class="order-entry margin-container" id="order-item">
        </div>
    
        <div class="divider margin-container"></div>
        <div class="total-section order-item margin-container">
            <h3 class="total order-title">Total price:</h3>
            <p class="price">$</p>
        </div>
        <button class="purchase-btn" id="">Complete order</button>
    `
    return allMenu
}



function render() {
    menuEl.innerHTML = getMenuHtml()
}

render()
