import data from './data.js';

const itemList = document.getElementById('item-list');
const itemsContainer = document.querySelector('#items');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');

for (let i = 0; i < data.length; i += 1) {
    //create a new div element and give it a class name
    const newDiv = document.createElement('div');
    newDiv.className = 'item';
    //create an image element
    const img = document.createElement('img');
    img.src = data[i].image;
    img.width = 300;
    img.height = 300;
    //add the image to the div
    newDiv.appendChild(img);
    console.log(img);
    itemsContainer.appendChild(newDiv);
    //add a paragraph element with the description and price
    const newDescription = document.createElement('p');
    newDescription.innerText = data[i].desc;
    const newPrice = document.createElement('p');
    newPrice.innerText = data[i].price;
    //add the paragraph to the div
    newDiv.appendChild(newDescription);
    newDiv.appendChild(newPrice);
    //create a button element
    const button = document.createElement('button');
    button.id = data[i].name;
    //custom attribute data-price to hold price for each item
    button.dataset.price = data[i].price;
    button.innerHTML = "Add to Cart";
    newDiv.appendChild(button);
    
}


const cart = [];

// Add Item
function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            cart[i].qty += 1;
            return;
        }
    }

    const item = { name, price, qty: 1 };
    cart.push(item);

}

// Show Items
function showItems() {
    
    const qty = getQty();
    cartQty.innerHTML = `You have ${qty} items in your cart.`;

    let itemStr = '';
    for (let i = 0; i < cart.length; i += 1) {
        // console.log(`- ${cart[i].name} ${cart[i].price} x ${cart[i].qty}`);

        const { name, price, qty } = cart[i];

        itemStr += `<li> ${name} ${price} x ${qty} = $${qty * price} </li>`;
    }
    itemList.innerHTML = itemStr;

    const total = getTotal()
    cartTotal.innerHTML = `Total price is $${total.toFixed(2)}`
}

// Get Qty
function getQty() {
    let qty = 0;
    for (let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty;
    }
    return qty
}

// Get total
function getTotal() {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i += 1) {
        totalPrice += cart[i].price * cart[i].qty
    }
    return totalPrice
}

// Removing Items
function removeItem (name, qty = 0) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= qty
            }
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }
            return
        }
    }
}


// itemList.innerHTML = '<li> Hello World</li>'


// Testing
addItem('Apple', 0.99);
addItem('Orange', 1.29);
addItem('Opinion', 0.02);
addItem('Apple', 0.99);
addItem('Frisbee', 9.92);
addItem('Apple', 0.99);
addItem('Orange', 1.29);

showItems()

removeItem('Apple', 1)
removeItem('Frisbee')

showItems();