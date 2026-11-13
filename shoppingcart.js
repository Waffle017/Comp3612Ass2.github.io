import config from './data-minified.json' with { type: 'json' };
document.addEventListener("DOMContentLoaded", () =>{
    let cart = [];

    function addToCart(productId, quantity){
        for(let products of config.products){
            if (productId == products.id){
                for(let cartProd of cart){
                    if (productId == cartProd.id){
                        cartProd.quantity += quantity;
                    } else {
                        config.products.id.push(cart)
                        config.products.title.push(cart)
                        config.products.price.push(cart)
                        config.products.thumbnail.push(cart)
                        config.products.quantity.push(cart)
                    }
                }
            }
        }

        

    }
});