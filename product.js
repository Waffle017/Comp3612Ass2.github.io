import config from './data-minified.json' with { type: 'json' };
import { addToCart } from './shoppingcart.js'
document.addEventListener("DOMContentLoaded", () => {

    function displaySingleProduct(product){
        document.querySelector("#breadcrumb").textContent = `Home > ${product.category} > ${product.title}`

        //Main product view
        //Fill in the skeleton HTML with the provided values
        let img = document.querySelector("#prodImage");
        img.src = product.images[0];
        img.alt = product.title;
        document.querySelector("#prodTitle").textContent = product.title;
        document.querySelector("#SKU").textContent = product.sku;
        document.querySelector("#starRating").textContent = generateStars(product.rating);
        document.querySelector("#productDesc").textContent = product.description;
        document.querySelector("#prodPrice").textContent = `$ ${product.price.toFixed(2)}`;
        if (product.stock > 0) {
            document.querySelector("#stockStatus").textContent = product.availabilityStatus
        } else {
            document.querySelector("#stockStatus").textContent = product.availabilityStatus
        }
        //Specifications
        document.querySelector("#specifications #weight").textContent = `${product.weight} lb`;
        document.querySelector("#specifications #dimensions").textContent = 
            `Width: ${product.dimensions.width }cm Height: ${product.dimensions.height}cm depth: ${product.dimensions.depth}cm`;
        document.querySelector("#warranty").textContent = product.warrantyInformation;
        document.querySelector("#shippingInfo").textContent = product.shippingInformation;
        document.querySelector("#returnPolicy").textContent = product.returnPolicy;

        //Tag Pills
        let pills = document.querySelector("#tagPills");
        pills.innerHTML = "";
        for (let prod of product.tags){
            let span = document.createElement("span");
            span.textContent = prod;
            pills.appendChild(span);
        }
        
        //Reviews
        let reviews = document.querySelector("#reviews");
        reviews.innerHTML = "";
        for(let rev of product.reviews){
            let div = document.createElement("div");
            let date = rev.date;
            date = new Date(date).toLocaleDateString();

            let pRating = document.createElement("p");
            let pComment = document.createElement("p");
            let pDate = document.createElement("p");
            let pName = document.createElement("p");
            pRating.textContent = generateStars(rev.rating)
            pComment.textContent = rev.comment;
            pDate.textContent = date;
            pName.textContent = rev.reviewerName;

            div.appendChild(pRating);
            div.appendChild(pComment);
            div.appendChild(pDate);
            div.appendChild(pName);
            reviews.appendChild(div);
        }
        //Add to cart functionality
        document.querySelector("#prodQuantity").value = 1;
        document.querySelector("#addToCart").dataset.id = product.id;
    }

    displaySingleProduct(config.products[0]);

    //Event Listeners
    let review = document.querySelector("#reviews");
    let reviewBtn = document.querySelector("#reviewBtn");
    let spec = document.querySelector("#specifications");
    let specBtn = document.querySelector("#specBtn");

    
    specBtn.addEventListener("click", () =>{ //when someone clicks on the specification button 
        spec.classList.remove("hidden");
        review.classList.add("hidden");
    });

    reviewBtn.addEventListener("click", () =>{ //when someone clicks on the review button
        spec.classList.add("hidden");
        review.classList.remove("hidden");
    });

    let addToCartBtn = document.querySelector("#addToCart");
    addToCartBtn.addEventListener("click", () =>{
        let prodId = addToCartBtn.dataset.id;
        let qtyValue = document.querySelector("#prodQuantity").value;


        addToCart(Number(prodId), Number(qtyValue));
        console.log(prodId);
        console.log(qtyValue);
    });

    //helper functions
    function generateStars(rating){
        let num = Math.round(rating); //round up the value of rating
        let star =  '';
        for(let i = 0; i < 5; i++){
            if (i < num){
                star += "★";
            } else{
                star += "☆";
            }
        }
        return star;
    }

    

});