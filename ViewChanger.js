document.addEventListener("DOMContentLoaded", () => {

    document.addEventListener("click", (e)=> {
        let dataView = e.target.closest("[data-view]");
        if (dataView){
            e.preventDefault();
            viewChanger(dataView.dataset.view)
        }
    });
});

export function viewChanger(viewName){
    let views = document.querySelectorAll(".view");
        
    //turn off all views
    for (let view of views){
        view.hidden = true;

    }
    //turn on requested view
    let requestedView = document.querySelector(`#${viewName}-view`) //'browse'-view etc etc
    requestedView.classList.toggle("show");
}
