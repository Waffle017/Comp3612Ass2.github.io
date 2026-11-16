import config from './data-minified.json' with { type: 'json' };
let cart = [];

export function addToCart(productId, quantity){
    let foundInCart = null;
        for(let cartProd of cart){
            if (cartProd.id === productId){
                foundInCart = cartProd;
            }
        }
        if (foundInCart){
            foundInCart.quantity += quantity;
        } else {
            for (let prod of config.products){
               if (prod.id === productId){
                let product = {id:prod.id, title: prod.title, thumbnail:prod.thumbnail, quantity:quantity, price: prod.price }
                cart.push(product);
               }     
            }
        }
        displayCart();  

    }


function displayCart(){
    let totalCount = 0;
    for(let item of cart){
        totalCount += item.quantity;
    }
    let span = document.querySelector("#cart-count"); //set the cart count to the total count
    span.textContent = totalCount;

    let cartRows = document.querySelector("#cart-rows"); //clear the table rows 
    cartRows.innerHTML = "";

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
            let prodQty = document.createElement("p");
            prodQty.textContent = item.quantity;
            //set the sub total
            let total = item.price * item.quantity;
            let sub = document.createElement("p");
            sub.textContent = `$${total.toFixed(2)}`;
            //set the remove btn
            let btn = document.createElement("button");
            btn.textContent="-";
            btn.dataset.id = item.id;

            product.appendChild(img);
            product.appendChild(span)
            price.appendChild(prodPrice);
            qty.appendChild(prodQty);
            subTotal.appendChild(sub);
            remove.appendChild(btn);

            tr.appendChild(product);
            tr.appendChild(price);
            tr.appendChild(qty);
            tr.appendChild(subTotal);
            tr.appendChild(remove);

            document.querySelector("#cart-rows").appendChild(tr);
            
        }
    }

}

//Helper functions 
function updateCartSummary(){
    
}
document.addEventListener("DOMContentLoaded", () =>{

});