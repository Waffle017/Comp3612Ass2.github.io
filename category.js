import config from './data-minified.json' with { type: 'json' };


function createSet(){
    const categorySet = new Set();
    for (let product of config.products){
        categorySet.add(product.category);
    }
    return categorySet;
}
console.log(categorySet);

function setCategoryImage(){
    //loop over the set 
    let categoryThumbnails = [];
    for (let category of categorySet){
        let firstProd = config.products.find(product => product.category == category);
        categoryThumbnails[category] = firstProd.thumbnail;

    }
    return categoryThumbnails;
}

function displayCategory(category){
    let categoryList = document.querySelector("#category-list");
    categoryList.innerHTML = "";

    for (thumbnails in categoryThumbnails){
        let a = document.createElement("a");  
        a.href = "#browse";
        a.classList = "category-tile";
        a.dataView = "browse";
        a.dataCategory = category;

        let img = document.createElement("img");

    }

}

console.log(categoryThumbnails);