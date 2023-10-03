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

// Handle Change Events on Update input
itemList.onchange = function (e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name;
        const qty = parseInt(e.target.value);
        updateCart(name, qty);
    }
}

// Handle Clicks on list
itemList.onclick = function (e) {
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name;
        removeItem(name);
    } else if (e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name;
        addItem(name);
    } else if (e.target && e.target.classList.contains('remove-one')) {
        const name = e.target.dataset.name;
        removeItem(name, 1);
    }
    

}


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

        itemStr += `<li> 
            ${name} $${price} x ${qty} = $${qty * price} 
            <button class="remove" data-name="${name}">Remove</button> 
            <button class="add-one" data-name="${name}"> + </button>
            <button class="remove-one" data-name="${name}"> - </button>  
            <input class="update" type="number" data-name=${name}>
        </li>`;
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
            showItems();
            return

        }
    }
}


// Updating Cart
function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty < 1) {
                removeItem(name);
                return;
            }
            cart[i].qty = qty;
            showItems();
            return;
        }
    }
}

const all_items_button = Array.from(document.querySelectorAll("button"))

all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))



