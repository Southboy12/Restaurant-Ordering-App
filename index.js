import { menuArray  } from "./data";


const menuEl = document.querySelector('#menus')
const preCheckout = document.querySelector('#pre-checkout')


document.addEventListener('click', function(e) {
    if (e.target.dataset.key) {
        handleAddMenu(e.target.dataset.key)
    }    
})

let orderLIst = []

function handleAddMenu(btnId) {

    const selectedObj = menuArray.filter(function(menu) {
        return menu.id === Number(btnId)
    })[0]
    
    orderLIst.push({
        name: selectedObj.name,
        price: selectedObj.price,
        id: selectedObj.id
    })    

    const orderHtml = orderLIst.map(order => {
        return `
        <div class="order-item">
            <h3 class="order-title">${order.name}</h3> 
            <button class="remove-btn">remove</button>
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
            <p class="price">$12</p>
        </div>
        <button class="purchase-btn" id="purchase-btn">Complete order</button>
    `
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

    
    

    return allMenu
}


function render() {
    menuEl.innerHTML = getMenuHtml()
}

render()
