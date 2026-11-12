import config from './data-minified.json' with {type: 'json'};
document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#app').addEventListener('click', function(e){
        if (e.target.classList.contains('product-link')){
            const productId = e.target.dataset.id;
            renderSingleProduct(productId);
        }
    })
    function renderSingleProduct(productId){
        const foundProduct = config.find(function(product){
            return product.id == productId;
        });

        let div = document.querySelector('.singleProduct');
        div.style.display = 'block';

        let logo = document.querySelector('#productImage');
        let h2 = document.querySelector('#productTitle');
        let h3 = document.querySelector('#productPrice');
        let pSKU = document.querySelector('#SKU');
        let span = document.querySelector('#starRating')
        let ul = document.querySelector('#tagPills')
        let pStock = document.querySelector('#stockStatus')
        let pDesc = document.querySelector('#productDesc');

        
        h2.textContent = foundProduct.title;
        h3.textContent = foundProduct.price;
        pSKU.textContent = foundProduct.sku
        pStock.textContent = foundProduct.stock;
        pDesc.textContent = foundProduct.description;
    }


});