import {menuArray} from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// global 
let orderedItems = [];
let total = 0;

// main 
renderIems()

// helper functions 
function renderIems() {
    let template = "";
    // add items in the menu
    menuArray.forEach(item => {
        template += `
            <div class="item">
                <p class="item-emoji">${item.emoji}</p>
                <div class="item-container">
                    <p class="item-name">${item.name}</p>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
                <button class="add-item-btn" data-id="${item.id}">+</button>
            </div>
            <hr /> 
        `;
    });

    // append the generated HMTL to the item container
    const itemContainer = document.querySelector(".items");
    itemContainer.innerHTML = template;
}

function renderOrderedItems() {
    let template = "";
    orderedItems.forEach(item => {
        // update HTML template
        template += `
            <div class="ordered-item">
                <span class="ordered-item-name">${item.name}</span>
                <button class="remove-item-btn" data-removebtn="${item.removeID}">Remove</button>
                <span class="ordered-item-price">$${item.price}</span>
            </div>
        `;
    });
    // add total HTML element
    template += `
        <hr />
        <div class="amount-container">
            <span>Total</span>
            <span>$${total}</span>
        </div> 
    `;

    document.querySelector(".ordered-items-container").innerHTML = template;
    document.querySelector(".order").classList.remove("hidden");
}

// event handlers 
function addItemBtnClick(itemID) {
    const targetItem = menuArray.filter(item => item.id === Number(itemID))[0];
    // update total
    total += targetItem.price;
    // add ordered item with a unique ID (we cannot rely on ite.id because we can add two or more items of the same kind)
    orderedItems.push({...targetItem, removeID: uuidv4()});
    // re-render
    renderOrderedItems();
    // scroll down to the total
    document.querySelector(".complete-order-btn").scrollIntoView();
}  

function completeOrderBtnClick() {
    // clear inputs 
    document.getElementById("modal-name").value = "";
    document.getElementById("modal-card-number").value = "";
    document.getElementById("modal-cvv").value = "";
    // show modal
    const modal = document.querySelector(".modal");
    console.log(modal)
    modal.classList.remove("hidden");
}

function payButtonClick() {
    // empty previous order
    total = 0;
    orderedItems = []
    // clear ordered items container and clear modal
    document.querySelector(".modal").classList.add("hidden");
    // change message
    document.querySelector(".order-msg").textContent = "Your ordered has been processed!";
    setTimeout(() => {
        document.querySelector(".order-msg").textContent = "";
    }, 3000)
    //re-render
    renderOrderedItems();
}

function removeItemBtnClick(orderedItemID) {
    // target item to be removed
    const itemToRemove = orderedItems.filter(item => item.removeID === orderedItemID)[0];
    // remove from total
    total -= itemToRemove.price;
    // remove item
    orderedItems = orderedItems.filter(item => item.removeID !== orderedItemID);
    // re-render
    renderOrderedItems();
}

// event listeners
document.addEventListener("click", e => {
    if (e.target.dataset.id) {
        addItemBtnClick(e.target.dataset.id);
    } else if (e.target.dataset.removebtn) {
        removeItemBtnClick(e.target.dataset.removebtn);
    }
});

document.querySelector(".complete-order-btn").addEventListener("click", e => {
    completeOrderBtnClick();
});

document.querySelector(".pay-btn").addEventListener("click", e => {
    payButtonClick();
})



