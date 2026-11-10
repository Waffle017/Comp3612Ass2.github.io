import config from './data-minified.json' with {type: 'json'};
document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#app').addEventListener('click', function(e){
        if (e.target.classList.contains('product-link')){
            const productId = e.target.dataset.id;
            reunderSingleProduct(productId);
        }
    })
    function renderSingleProduct(e){
        
    }


});