import { menuArray  } from "./data";


const menuEl = document.querySelector('#menus')

const preCheckout = document.querySelector('#pre-checkout')


document.addEventListener('click', function(e) {
    if (e.target.dataset.key) {
        handleAddMenu(e.target.dataset.key)
    }
    
    
})


let isPreCheckoutrendered = false
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
    // console.log(orderLIst);
    
    const orderHtml = orderLIst.map(order => {
        return order
    })
    console.log(orderHtml);

}





// function handleAddMenu(btnId) {

//     menuArray.forEach(menu => {
        
//         if (menu.id === Number(btnId)) {

            

//             if (!isPreCheckoutrendered) {                
//                 preCheckout.style.visibility = 'visible'

//                 preCheckout.innerHTML = `
//                     <h3 class="checkout-title">Your order</h3>
//                     <div class="order-item margin-container" id="order-item">
//                         <h3 class="order-title">${menu.name}</h3> 
//                         <button class="remove-btn">remove</button>
//                         <p class="price">$${menu.price}</p>
//                     </div>
                
//                     <div class="divider margin-container"></div>
//                     <div class="total-section order-item margin-container">
//                         <h3 class="total order-title">Total price:</h3>
//                         <p class="price">$${menu.price}</p>
//                     </div>
//                     <button class="purchase-btn" id="purchase-btn">Complete order</button>
//                 `
//                 isPreCheckoutrendered = true
//             }
//             else {
//                 const orderItemEl = document.querySelector('#order-item');
//                 orderItemEl.innerHTML += `
//                     <h3 class="order-title">${menu.name}</h3> 
//                     <button class="remove-btn">remove</button>
//                     <p class="price">$${menu.price}</p>
//                 `
//             }
//         }
        
//     });      
// }


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


    // const addBtns = document.querySelectorAll('.add-btn')
    // addBtns.forEach(addBtn => addBtn.addEventListener('click', handleAddMenu));
    
    // document.addEventListener('click', function(e) {

    //     handleAddMenu(e.target.dataset.key)
        
    // })
}

render()
