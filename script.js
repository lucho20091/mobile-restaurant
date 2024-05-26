import { menuArray } from './data.js'
const container = document.getElementById('container')
const newItems = document.getElementById('new-items')
const totalPrice = document.getElementById('total-price')
const order = document.getElementById('order-div')

const renderItems = () => {
    let html = menuArray.map((item)=>{
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
            <button id="${item.id}">+</button>
        </div>
    </div>`
    })
    return html
}

container.innerHTML = renderItems()
let itemsArrPrice = []
let itemsArrName = []
let itemsObj = {}

document.addEventListener('click', (e)=>{
    const BtnArr = ['0','1','2']
    console.log(e.target.id)
        menuArray.map((item) => {
            if (e.target.id === `remove-${item.id}`){
                item.score--
                document.getElementById(`quantity-${item.id}`).innerText = `Quantity: ${item.score}`
            }
        })
    

    if (BtnArr.includes(e.target.id)){
        menuArray.map((item, index) => {
            if (item.id == e.target.id){
                order.classList.remove('hidden')
                itemsArrPrice.push(item.price)
                if (!itemsArrName.includes(index)){
                    itemsArrName.push(index)
                    item.score++
                    const newItem = document.createElement('div')
                    newItem.classList.add('item')
                    newItem.innerHTML = renderOrder(item)
                    newItems.appendChild(newItem)
                } else {
                    document.getElementById(`quantity-${item.id}`).innerText = `Quantity: ${item.score++}`
                    document.getElementById(`price-${item.id}`).innerText = item.price * (item.score-1)
                }
                totalPrice.innerHTML = renderTotalAmount(itemsArrPrice)
            }
        })
    }

})


const renderOrder = (item) => {
    return `        
    <div class="left">
        <h2>${item.name}</h2>
        <button id="remove-${item.id}">remove</button>
        <p id="quantity-${item.id}">Quantity: ${item.score++}</p>
    </div>
    <p id="price-${item.id}">${item.price}</p>
    `
}

const renderTotalAmount = (arr) => {
    const amount = arr.reduce((total, current)=> total + current)
    return `
    <h2>Total Price</h2>
    <p>${amount}</p>
    `
}