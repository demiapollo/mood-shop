import data from './data.js';

const itemsContainer = document.querySelector('#items');

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

function addItem(name, price) {
    const item = { name: name, price: price, qty: 1 };
    cart.push(item);

}

function showItems() {
    console.log(`You have ${cart.length} items in your cart.`);

}

addItem('Apple', 0.99);
addItem('Orange', 1.29);

showItems();