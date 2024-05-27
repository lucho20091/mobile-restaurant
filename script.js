import { menuArray } from './data.js'
const container = document.getElementById('container')
const newItems = document.getElementById('new-items')
const totalPrice = document.getElementById('total-price')
const order = document.getElementById('order-div')

const renderItems = () => {
    return menuArray.map((item)=>{
    return ` 
    <div class="flex-main">
        <div class="left">
            <h1>${item.emoji}</h1>
        <div>
            <h3>${item.name}</h3>
            <p>${item.ingredients.join(', ')}</p>
            <p>$${item.price}</p>
        </div>
        </div>
        <div class="right">
            <button id="${item.id}"class="add-button">+</button>
        </div>
    </div>`
    }).join('')

}

container.innerHTML = renderItems()
let itemsArrId = []
let itemsArrPrice = []

document.addEventListener('click', (e)=>{
    console.log(e.target)
    if (e.target.classList.contains('add-button')){
    const itemId = e.target.id
    const item = menuArray.find(item => item.id == itemId)
    order.classList.remove('hidden')
    if (!itemsArrId.includes(item.id)){
        order.classList.remove('hidden')
        itemsArrId.push(item.id)
        item.score = 1
        itemsArrPrice.push(item.price)
        const newItem = document.createElement('div')
        newItem.classList.add('item')
        newItem.innerHTML = renderOrder(item)
        newItems.appendChild(newItem)
    } else {
        item.score++
        itemsArrPrice.push(item.price)
        document.getElementById(`quantity-${item.id}`).innerText = `Quantity: ${item.score}`
        document.getElementById(`price-${item.id}`).innerText = item.price * item.score
    }
    totalPrice.innerHTML = renderTotalAmount(itemsArrPrice)
}
    if (e.target.classList.contains('remove-btn')){
        const itemId = e.target.dataset.remove
        const item = menuArray.find(item => item.id == itemId)
        if (item.score <= 1){
            const itemElement = document.getElementById(`item-${item.id}`)
            itemElement.remove()
            let index = itemsArrId.indexOf(item.score)
            itemsArrId.splice(index, 1)
            if (itemsArrId.length === 0){
                order.classList.add('hidden')
            }
        } else {
            item.score--
            let index = itemsArrPrice.indexOf(item.price)
            itemsArrPrice.splice(index, 1)
            document.getElementById(`quantity-${item.id}`).innerText = `Quantity: ${item.score}`
            document.getElementById(`price-${item.id}`).innerText = item.price * item.score
            totalPrice.innerHTML = renderTotalAmount(itemsArrPrice)
        }
    }
    if (e.target.classList.contains('complete-order') && e.target.id === 'complete-order'){
            document.getElementById('modal').classList.remove('hidden')
    }
    if (e.target.classList.contains('form-btn') && e.target.id === 'form-btn'){
        e.preventDefault()
        const form = e.target.closest('form')
        if (form.checkValidity()){
            form.submit();
            window.location.href = './index2.html'
        }
        
    }
    if (e.target.id === 'close-modal'){
        modal.classList.add('hidden')
    }
})

const renderOrder = (item) => {
    return `
    <div class="flex-order" id="item-${item.id}">        
    <div class="left">
        <h2>${item.name}</h2>
        <button id="remove-${item.id}" data-remove="${item.id}" class="remove-btn">remove</button>
        <p id="quantity-${item.id}">Quantity: ${item.score}</p>
    </div>
    <p id="price-${item.id}">${item.price}</p>
    </div>`
}

const renderTotalAmount = (arr) => {
    const amount = arr.reduce((total, current)=> total + current, 0)
    return `
    <h2>Total Price</h2>
    <p>${amount}</p>
    `
}
