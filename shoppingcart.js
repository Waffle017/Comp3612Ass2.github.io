import config from './data-minified.json' with { type: 'json' };
let cart = [];

//shipping price for each method, then each destination
const shippingRates = {
    standard: { CA: 10, US: 15, INT: 20 },
    express:  { CA: 25, US: 25, INT: 30 },
    priority: { CA: 35, US: 50, INT: 50 }
};

export function addToCart(productId, quantity){
    let foundInCart = null;
        for(let cartProd of cart){
            if (cartProd.id === productId){ //check if the item is already in the cart, if it is set to true
                foundInCart = cartProd;
            }
        }
        if (foundInCart){ //if the item is already in the cart, increase quantity
            foundInCart.quantity += quantity;
        } else {
            for (let prod of config.products){ // if not in cart add it to the cart array
               if (prod.id === productId){
                let product = {id:prod.id, title: prod.title, thumbnail:prod.thumbnail, quantity:quantity, price: prod.price }
                cart.push(product);
               }     
            }
        }
        displayCart(); // display the contents of the cart
        saveCart(); //in the event the user refreshes, save the cart

    }


function displayCart(){
    let totalCount = 0;
    for(let item of cart){
        totalCount += item.quantity;
    }
    let span = document.querySelector("#cart-count"); //set the cart count to the total count
    span.textContent = totalCount;

    let cartRows = document.querySelector("#cart-rows"); //clear the table rows 
    cartRows.replaceChildren();

    if (cart.length == 0){
        document.querySelector("#cart-empty").hidden = false; //unhide the empty cart
        document.querySelector("#cart-table").hidden = true; //hide cart table
        document.querySelector("#shipping-options").disabled = true; //make sure you cant interact with buttons 
        document.querySelector("#checkout-button").disabled = true;
    } else{
        document.querySelector("#cart-empty").hidden = true; //hide the empty cart
        document.querySelector("#cart-table").hidden = false //show the cart
        document.querySelector("#shipping-options").disabled = false;
        document.querySelector("#checkout-button").disabled = false; //make sure buttons are functional
        document.querySelector("#cart-view").hidden = false;
    
        //Create the cart table 
        for (let item of cart){
            let tr = document.createElement("tr");
            let product = document.createElement("td");
            let price = document.createElement("td");
            let qty = document.createElement("td");
            let subTotal = document.createElement("td");
            let remove = document.createElement("td");

            //set the product
            let img = document.createElement("img")
            img.src = item.thumbnail;
            img.alt = item.title;
            let span = document.createElement("span")
            span.textContent = item.title;

            //set the price
            let prodPrice = document.createElement("p");
            prodPrice.textContent = `$${item.price.toFixed(2)}`;

            //set the quantity
            let prodQty = document.createElement("input");
            prodQty.type = "number";
            prodQty.min = "1";
            prodQty.value = item.quantity;
            prodQty.dataset.id = item.id;
            prodQty.className = "qty-input";

            //set the sub total
            let total = item.price * item.quantity;
            let sub = document.createElement("p");
            sub.textContent = `$${total.toFixed(2)}`;

            //set the remove btn
            let btn = document.createElement("button");
            btn.classList.add("del-btn");
            btn.textContent="-";
            btn.dataset.id = item.id;

            product.appendChild(img); //append the img to product td
            product.appendChild(span) //append the span to the product td
            price.appendChild(prodPrice); //append the price to price td
            qty.appendChild(prodQty); //append the quantity to qty td
            subTotal.appendChild(sub); // append the sub total to subtotal td
            remove.appendChild(btn); //append remove button to remove td

            //append all td elements to tr
            tr.appendChild(product);
            tr.appendChild(price);
            tr.appendChild(qty);
            tr.appendChild(subTotal);
            tr.appendChild(remove);

            document.querySelector("#cart-rows").appendChild(tr);

            
        }
    }
    updateCartSummary();

}

//Helper functions 
function updateCartSummary(){
    //All the query selectors needed for cart summary
    let shipping = document.querySelector("#summary-shipping");
    let taxAmt = document.querySelector("#summary-tax");
    let merch = document.querySelector("#summary-merchandise");
    let summary = document.querySelector("#summary-total");
    let shippingMethod = document.querySelector("#shipping-method").value;
    let shippingDestination = document.querySelector("#shipping-destination").value;

    //all calculated totals
    let subTotal = 0;
    let shipPrice = 0;
    let tax = 0;

    // get the sub total for one item and its quantity
    for(let item of cart){
        subTotal += (item.price * item.quantity);
    }
    merch.textContent = `$${subTotal.toFixed(2)}`
    //figure out the shipping amount
    if(subTotal > 500 || cart.length == 0){
        shipPrice = 0;
    } else { //look up the shipping price using the method and destination
        shipPrice = shippingRates[shippingMethod][shippingDestination];
    }
    shipping.textContent = `$${shipPrice.toFixed(2)}`;
    //Calculate tax total
    if (document.querySelector("#shipping-destination").value == "CA"){
        tax = subTotal * 0.05;
    } else{
        tax = 0;
    }
    taxAmt.textContent = `$${tax.toFixed(2)}`;
    let total = subTotal + shipPrice + tax;
    summary.textContent = `$${total.toFixed(2)}`;
}

export function toastDisplay(msg){
    let toast = document.querySelector("#toast");
    toast.textContent = msg; // set the text to the message 
    toast.hidden = false; // unhide the div element
    setTimeout(() => toast.hidden = true, 3000); //have the message disappear after 3 seconds

}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () =>{
    let item = localStorage.getItem("cart");
    if(item){
        cart = JSON.parse(item);
    }
    displayCart(); //always run so an empty cart shows the empty message and disables checkout
    //all query selectors for each event handler
    const shippingSelect = document.querySelector("#shipping-method");
    const destSelect = document.querySelector("#shipping-destination");
    const cartRow = document.querySelector("#cart-rows");
    const checkout = document.querySelector("#checkout-button");


    shippingSelect.addEventListener("change", () => { //When the user changes the shipping method recalculate total
        updateCartSummary();
    });

    destSelect.addEventListener("change", () => { //When the user changes the destination recalculate total
        updateCartSummary();
    });

    cartRow.addEventListener("click", (e) => {  //click event when the user deletes
        if (e.target.classList.contains("del-btn")){
            let prodId = Number(e.target.dataset.id);
            cart = cart.filter(item => item.id !== prodId);
            displayCart();
            saveCart(); //in the event the user refreshes, save the cart

        }
    });

    cartRow.addEventListener("change", (e) => { //change event when the user edits a quantity
        if (e.target.classList.contains("qty-input")){
            let prodId = Number(e.target.dataset.id);
            let newQty = Number(e.target.value);
            if (newQty < 1 || !Number.isInteger(newQty)){ //do not allow 0, negatives or decimals
                newQty = 1;
            }
            for (let item of cart){
                if (item.id === prodId){
                    item.quantity = newQty;
                }
            }
            displayCart();
            saveCart(); //in the event the user refreshes, save the cart
        }
    });

    checkout.addEventListener("click", (e) => { //click event when a checkout occurs
        cart = [];
        saveCart(); //in the event the user refreshes, save the cart
        displayCart();
        document.querySelector("#cart-view").hidden = true; //hide the cart
        document.querySelector("#home-view").hidden = false; //go back to the home view
        let msg = "Order placed!";
        toastDisplay(msg);
    });
    
});

