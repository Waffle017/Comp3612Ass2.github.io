import config from './data-minified.json' with { type: 'json' };


function displayBrowse(products){
    let browseResults = document.querySelector("#browse-results");
    let noResults = document.querySelector("#no-results");
    browseResults.innerHTML = "";

    if (products.length == 0){
        noResults.hidden = false;
        return;
    } else {
        noResults.hidden = true;
    }

    for(let item of products){
        let article = document.createElement("article");
        let a = document.createElement("a");
        let prodImg = document.createElement("img");
        let prodH3 = document.createElement("h3");
        let p = document.createElement("p");
        let div = document.createElement("div");
        let span = document.createElement("span");
        let btn = document.createElement("button");

        a.href = "#product";
        a.class = "product-card-link";
        a.dataset.view = "product";
        a.dataset.id = item.id;

        prodImg.class = "product-card-image";
        prodImg.src = item.thumbnail;
        prodImg.alt = item.title;

        prodH3.class = "product-card-title";
        prodH3.textContent = item.title;

        p.class = "product-card-category";
        p.textContent = item.category;

        div.class = "product-card-footer";

        span.class = "product-card-footer";
        span.textContent = `$${item.price.toFixed(2)}`

        btn.type = "button";
        btn.class = "add-button";
        btn.textContent = "+";
        btn.dataset.id = item.id;

        a.appendChild(prodImg);
        a.appendChild(prodH3);

        div.appendChild(span);
        div.appendChild(btn);

        article.appendChild(a);
        article.appendChild(p);
        article.appendChild(div);

        browseResults.appendChild(article);
    }
}
//sort through the filters and only display what was given
function applyFiltersAndSort(){
    let name = document.querySelector("#filter-name");
    let filterName = name.value;
    let filteredArr = config.products.filter(()=>true); //copy all elements from products array
    filterName = filterName.trim(); //remove whitespace
    filterName = filterName.toLowerCase(); //convert to lowercase
    if(filterName != ''){
        filteredArr = filteredArr.filter(item => item.title.toLowerCase(includes(filterName)));   
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    displayBrowse(config.products);
})