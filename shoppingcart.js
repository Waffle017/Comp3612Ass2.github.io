import config from './data-minified.json' with { type: 'json' };
let cart = [];

export function addToCart(productId, quantity){
    let foundInCart = null;
        for(let cartProd of cart){
            if (cartProd.id == productId){
                foundInCart = cartProd;
            }
        }
        if (foundInCart){
            foundInCart.quantity += quantity;
        } else {
            for (let prod of config.products){
               if (prod.id == productId){
                let product = {id:prod.id, title: prod.title, thumbnail:prod.thumbnail, quantity:quantity, price: prod.price }
                cart.push(product);
               }     
            }
        }
        console.log(cart);   

    }


function displayCart(){
    let totalCount = 0;
    for(let item of cart){
        totalCount += item.quantity;
    }
    let span = document.querySelector("#cart-count"); //set the cart count to the total count
    span.textContent = totalCount;

    let cartRows = document.querySelector("#cart-rows"); //clear the table rows 
    cartRows.innerHtml = "";

    if (cart.length == 0){
        
    }

}
document.addEventListener("DOMContentLoaded", () =>{

});