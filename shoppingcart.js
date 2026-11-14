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
    for(let item of cart){
        
    }
}
document.addEventListener("DOMContentLoaded", () =>{

});