import { menuArray  } from "./data";


const menuEl = document.querySelector('#menus')

function getHtml() {
    
    const allMenu = menuArray.map(menu => {
        return `
            <div class="menu-details" data-key="${menu.id}">
                <p class="menu-emoji">${menu.emoji}</p>
                <div class="menu-info">
                    <h3 class="menu-title">${menu.name}</h3>
                    <p class="menu-description">${menu.ingredients}</p>
                    <p class="price">$${menu.price}</p>
                </div>
                <button class="add" data-key="${menu.id}">+</button>
            </div>
        `
    }).join('')
    return allMenu
}

function render() {
    menuEl.innerHTML = getHtml()
}

render()
